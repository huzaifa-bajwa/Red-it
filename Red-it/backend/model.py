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
    url: str
    email: str

class ContextQuery(BaseModel):   #This is the model for the Context Query
    url: str
    highlighted_text: str

class Summary(BaseModel):   #This is the model for the Summary
    language: str
    url: str
    email: str

class Flashcard(BaseModel):   #This is the model for the Flashcards
    language: str
    url: str
    email : str

class History(BaseModel):   #This is the model for the History
    email: str

class TranslateSummary(BaseModel):   #This is the model for the Translation of the Summary
    from_language: str
    to_language: str
    text: str
class TranslateFlashcard(BaseModel):   #This is the model for the Translation of the Flashcards
    from_language: str
    to_language: str
    text: list


