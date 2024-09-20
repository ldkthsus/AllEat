from pydantic import BaseModel

class GPTRequest(BaseModel):
    prompt: str
