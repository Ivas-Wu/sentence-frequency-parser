from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.FrequencyChecker import FrequencyChecker

app = FastAPI()

origins = [
    "http://localhost:3000",  # Frontend React app running locally (adjust this if needed)
    "http://127.0.0.1:3000",  # If you use a different domain or port for local development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

fc = FrequencyChecker()

class TextInput(BaseModel):
    text: str
    num_sentences: int

@app.post("/get-duplicates")
def get_duplicates(input: TextInput):
    parsed = fc.parse(input.text)
    mapping = fc.getDuplicates(parsed, input.num_sentences)
    return {
        "mapping": mapping,
        "originalString": input.text
    }
