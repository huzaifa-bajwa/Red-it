from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from model import User, UserLogin, TextData, PresentationData, ContextQuery, FlashcardOrSummary
from database import add_user, get_user, autheticate_user
from interactionwithGPT import generate_summary, generate_flashcard, generate_powerpoint, generate_context_query
from email_verify import email_verifier
from name_validation import is_valid_name
from webscraping import getWebPageContent
from translator import translate_text_to_target_language
app = FastAPI()


origins = ['https://localhost:3000']

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
async def create_user(user: User):
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
async def login_user(user: UserLogin):
    response = await autheticate_user(user.email, user.password)
    if response == True:
        return {"message": "User has been authenticated"}
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")

@app.post("/summary/")
async def create_summary(query: FlashcardOrSummary):
    print(query.url)
    data = getWebPageContent(query.url)
    gptresponse = generate_summary(data)
    language = query.language
    response = translate_text_to_target_language(gptresponse, language.lower())
    return {"summary": response}

@app.post("/flashcard/")
async def create_flashcards(query: FlashcardOrSummary):
    print(query.url)
    data = getWebPageContent(query.url)
    gptresponse = generate_flashcard(data)
    language = query.language
    response =[]
    for i in gptresponse:
        response.append(translate_text_to_target_language(i, language.lower()))
    return {"flashcards": response}

@app.post("/presentation/")
async def create_presentation(query: PresentationData):
    print(query.url)
    data = getWebPageContent(query.url)
    response = generate_powerpoint(data)
    return {"presentation": response}

@app.post("/context/")
async def create_context(query: ContextQuery):
    print(query.url)
    data = getWebPageContent(query.url)
    response = generate_context_query(data, query.highlighted_text)
    return {"context": response}

