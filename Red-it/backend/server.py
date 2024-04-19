from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi import BackgroundTasks
from model import User, UserLogin, TextData, PresentationData, ContextQuery, Summary, Flashcard, History, TranslateFlashcard, TranslateSummary
from database import add_user, get_user, autheticate_user, add_history, get_history
from interactionwithGPT import generate_summary, generate_flashcard, generate_powerpoint, generate_context_query
from email_verify import email_verifier
from name_validation import is_valid_name
from webscraping import getWebPageContent
from translator import translate_text_to_target_language



app = FastAPI()


origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/newuser/")
async def create_user(user: User):          #Creating a new user
    email_response = email_verifier(user.email)
    if email_response == False:
        raise HTTPException(status_code=400, detail="Invalid email")
    else:    
        if is_valid_name(user.username) == False:
            raise HTTPException(status_code=400, detail="Invalid username. Username should only contain alphabets and spaces.")
        else:
            response = await add_user(user.username, user.email, user.password)
            if response['status'] == True:
                return {"message": "User has been created"}
            else:
                if response['error'] == "Email":
                    raise HTTPException(status_code=400, detail="Email already exists")
                else:
                    raise HTTPException(status_code=400, detail="User already exists")

@app.post("/login/")
async def login_user(user: UserLogin):   #Logging in the user
    response = await autheticate_user(user.email, user.password)
    if response == True:
        return {"message": "User has been authenticated"}
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")

@app.post("/summary/")
async def create_summary(query: Summary, background_tasks: BackgroundTasks):   #Creating the summary
    print(query.url)
    try:

        data = getWebPageContent(query.url)
        gptresponse = generate_summary(data)
        language = query.language
        if language.lower() == "english":
            background_tasks.add_task(add_history, query.email, gptresponse, "Summary")
            return {"summary": gptresponse}
        response = translate_text_to_target_language(gptresponse, "english",language.lower())
        background_tasks.add_task(add_history, query.email, response, "Summary")
        return {"summary": response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Some Error Occurred")

@app.post("/flashcard/")
async def create_flashcards(query: Flashcard, background_tasks: BackgroundTasks):  #Creating the flashcards
    print(query.url)
    try:
        data = getWebPageContent(query.url)
        gptresponse = generate_flashcard(data)
        language = query.language
        if language.lower() == "english":
            background_tasks.add_task(add_history, query.email, gptresponse, "Flashcard")
            return {"flashcards": gptresponse}
        response =[]
        for i in gptresponse:
            response.append(translate_text_to_target_language(i, "english",language.lower()))
        background_tasks.add_task(add_history, query.email, response, "Flashcard")
        return {"flashcards": response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Some Error Occurred")

@app.post("/presentation/")
async def create_presentation(query: PresentationData, background_tasks: BackgroundTasks):     #Creating the presentation
    print(query.url)
    try:
        data = getWebPageContent(query.url)
        response = generate_powerpoint(data)
        background_tasks.add_task(add_history, query.email, response, "Presentation")
        return {"presentation": response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Some Error Occurred")

@app.post("/context/")
async def create_context(query: ContextQuery):     #Creating the context query
    print(query.url)
    try:
        data = getWebPageContent(query.url)
        response = generate_context_query(data, query.highlighted_text)
        return {"context": response}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Some Error Occurred")

@app.post("/history/")
async def retrieve_history(query: History):   #Retrieving the history of the user
    response = await get_history(query.email)
    return {"history": response}

@app.post("/translatesummary/")
async def translate_summary(query: TranslateSummary):  #Translating the summary to the target language
    response = translate_text_to_target_language(query.text, query.from_language.lower(), query.to_language.lower())
    return {"translation": response}

@app.post("/translateflashcard/")  
async def translate_flashcard(query: TranslateFlashcard): #Translating the flashcards to the target language
    response =[]
    for i in query.text:
        response.append(translate_text_to_target_language(i,query.from_language.lower(), query.to_language.lower()))
    return {"translation": response}


