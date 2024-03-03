from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from model import User, UserLogin, TextData, PresentationData, ContextQuery
from database import add_user, get_user, autheticate_user
from interactionwithGPT import generate_summary, generate_flashcard, generate_powerpoint, generate_context_query

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
async def create_summary(query: TextData):
    response = generate_summary(query.data)
    return {"summary": response}

@app.post("/flashcard/")
async def create_flashcards(query: TextData):
    response = generate_flashcard(query.data)
    return {"flashcards": response}

@app.post("/presentation/")
async def create_presentation(query: PresentationData):
    response = generate_powerpoint(query.data)
    return {"presentation": response}

@app.post("/context/")
async def create_context(query: ContextQuery):
    response = generate_context_query(query.data, query.highlighted_text)
    return {"context": response}






