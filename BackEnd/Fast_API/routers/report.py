from fastapi import APIRouter, HTTPException
import openai
from models import GPTRequest

router = APIRouter()

# 일간 총평 엔드포인트
@router.post("/day")
async def get_day_summary(request: GPTRequest):
    try:
        base_prompt = """
        너는 유능한 영양학자이자 재무 분석관이야. 
        내가 제공할 일간 식단과 식비 데이터를 보고, 영양과 비용 효율성을 고려해 100자 이내로 간단한 총평을 작성해줘.
        말투는 ~요로 끝나게끔 해주고 친근한 말투로 해줘.
        """
        
        full_prompt = base_prompt + "\n\n" + request.prompt

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": full_prompt},
            ],
        )
        return {"response": response.choices[0].message['content']}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 주간 총평 엔드포인트
@router.post("/week")
async def get_week_summary(request: GPTRequest):
    try:
        base_prompt = """
        너는 유능한 영양학자이자 재무 분석관이야. 
        내가 제공할 주간 식단과 식비 데이터를 보고, 영양과 비용 효율성을 고려해 100자 이내로 간단한 총평을 작성해줘.
        말투는 ~요로 끝나게끔 해주고 친근한 말투로 해줘.
        """
        
        full_prompt = base_prompt + "\n\n" + request.prompt

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": full_prompt},
            ],
        )
        return {"response": response.choices[0].message['content']}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 월간 총평 엔드포인트
@router.post("/month")
async def get_month_summary(request: GPTRequest):
    try:
        base_prompt = """
        너는 유능한 영양학자이자 재무 분석관이야. 
        내가 제공할 월간 식단과 식비 데이터를 보고, 영양과 비용 효율성을 고려해 100자 이내로 간단한 총평을 작성해줘.
        말투는 ~요로 끝나게끔 해주고 친근한 말투로 해줘.
        """
        
        full_prompt = base_prompt + "\n\n" + request.prompt

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": full_prompt},
            ],
        )
        return {"response": response.choices[0].message['content']}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
