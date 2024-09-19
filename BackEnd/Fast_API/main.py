import os
import openai
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from packages.dependencies import decode_jwt
from pydantic import BaseModel
# .env 파일 로드
load_dotenv()

# OpenAI API 키 설정
openai_api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = openai_api_key

app = FastAPI()

# CORS 설정
origins = [
    os.getenv("TEST_LOCAL"),  
]



# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

# JWT 토큰 검증 미들웨어
@app.middleware("http")
async def jwt_filter(request: Request, call_next):
    # Authorization 헤더에서 토큰 추출
    auth_header = request.headers.get("Authorization")
    if auth_header is None or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header is missing or invalid")
    
    token = auth_header.split(" ")[1]  # 'Bearer' 부분을 제외하고 토큰만 추출
    try:
        user_id = decode_jwt(token=token)  # 토큰 디코딩
    except HTTPException as e:
        raise e
    
    response = await call_next(request)
    return response

# POST 엔드포인트 추가
@app.post("/fast-api")
async def fast_api_endpoint():
    return {"message": "Hello, World!"}

# 요청 모델 정의
class GPTRequest(BaseModel):
    prompt: str

@app.post("/gpt")
async def get_gpt_response(request: GPTRequest):
    try:
        # OpenAI GPT 모델 호출
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # 사용할 모델 지정
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": request.prompt},
            ],
        )
        return {"response": response.choices[0].message['content']}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# FastAPI 서버 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
