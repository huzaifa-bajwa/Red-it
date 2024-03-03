from pydantic import BaseModel

class User(BaseModel):  #This is the model for the user when they sign up
    username: str
    email: str
    password: str

class UserLogin(BaseModel):   #This is the model for the login
    email: str
    password: str

class TextData(BaseModel):   #This is the model for the Summary and Flashcards
    data: str
    language: str

class PresentationData(BaseModel):   #This is the model for the Presentation
    data: str
class ContextQuery(BaseModel):   #This is the model for the Context Query
    data: str
    highlighted_text: str

