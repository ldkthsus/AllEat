import os
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from packages.dependencies import decode_jwt, oauth2_scheme  

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
    try:
        user_id = decode_jwt(token=Depends(oauth2_scheme))  
    except HTTPException as e:
        raise e
    
    response = await call_next(request)
    return response

# FastAPI 서버 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)