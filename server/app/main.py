from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.FrequencyChecker import FrequencyChecker
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv()

origins = os.getenv("CORS_ORIGINS", "").split(",")  # Default to empty if not found

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class TextInput(BaseModel):
    text: str
    num_sentences: int
    sb: str
    wb: str
    exceptions: str

@app.post("/get-duplicates")
def get_duplicates(input: TextInput):
    fc = FrequencyChecker()
    fc.populateWB(input.wb)
    fc.populateSB(input.sb)
    fc.populateExceptions(input.exceptions)
    parsed = fc.parse(input.text)
    mapping = fc.getDuplicates(parsed, input.num_sentences)
    return {
        "mapping": mapping,
        "originalString": input.text
    }
