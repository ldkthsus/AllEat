import openai
import logging  # 추가된 부분
# from models import GPTRequest, DayDiaryRequest, WeekDiaryRequest, MonthDiaryRequest
from fastapi import APIRouter, HTTPException
from models import DayDiaryRequest, WeekDiaryRequest, MonthDiaryRequest

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
router = APIRouter()

# 일간 총평 엔드포인트
@router.post("/day")
async def get_day_summary(request: DayDiaryRequest):
    try:
        # 로그 출력
        logger.info(f"Received DayDiaryRequest: {request.json()}")

        # 고정된 프롬프트 정의
        base_prompt = f"""
        너는 유능한 영양학자이자 재무 분석관이야. 
        내가 제공할 일간 식단과 식비 데이터를 보고, 영양과 비용 효율성을 고려해 100자 이내로 간단한 총평을 작성해줘.
        오늘의 총 섭취한 탄수화물은 {request.total_carbohydrates}g, 단백질은 {request.total_proteins}g, 지방은 {request.total_fats}g이며,
        총 섭취한 칼로리는 {request.total_calories}kcal이고, 오늘 소비한 총 비용은 {request.total_cost}원이야.
        목표 체중은 {request.goal_weight}kg이고, 목표 식비는 한 달에 {request.goal_cost}원이며, 현재 체중은 {request.recent_weight}kg이야.
        말투는 ~요로 끝나게끔 해주고 친근한 말투로 부탁해.
        """

        # OpenAI GPT 모델 호출
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": base_prompt},
            ],
        )
        
        # GPT 응답을 로그에 출력
        logger.info(f"GPT-4 Response: {response.choices[0].message['content']}")

        return {"response": response.choices[0].message['content']}
    
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# 주간 총평 엔드포인트
@router.post("/week")
async def get_week_summary(request: WeekDiaryRequest):
    try:
        # 고정된 프롬프트 정의
        base_prompt = f"""
        너는 유능한 영양학자이자 재무 분석관이야. 
        내가 제공할 주간 식단과 식비 데이터를 보고, 영양과 비용 효율성을 고려해 100자 이내로 간단한 총평을 작성해줘.
        이번 주의 목표 체중은 {request.goal_weight}kg이고, 목표 식비는 한 달에 {request.goal_cost}원이야. 현재 체중은 {request.recent_weight}kg이야.
        이번 주의 평균 섭취 탄수화물은 {request.average_carbohydrates}g, 단백질은 {request.average_proteins}g, 지방은 {request.average_fats}g, 평균 칼로리는 {request.average_calories}kcal이야.
        총 사용한 식비는 {request.total_cost}원이었고, 외식 중 가장 많았던 유형은 '{request.most_common_restaurant_type}'이었어.
        말투는 ~요로 끝나게끔 해주고 친근한 말투로 부탁해.
        """

        # OpenAI GPT 모델 호출
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": base_prompt},
            ],
        )

        return {"response": response.choices[0].message['content']}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/month")
async def get_month_summary(request: MonthDiaryRequest):
    try:
        base_prompt = f"""
        너는 유능한 영양학자이자 재무 분석관이야. 
        내가 제공할 월간 식단과 식비 데이터를 보고, 영양과 비용 효율성을 고려해 100자 이내로 간단한 총평을 작성해줘.
        이번 달의 목표 체중은 {request.goal_weight}kg이고, 목표 식비는 {request.goal_cost}원이야.
        이번 달 평균 섭취 탄수화물은 {request.average_carbohydrates}g, 단백질은 {request.average_proteins}g, 지방은 {request.average_fats}g, 평균 칼로리는 {request.average_calories}kcal이야.
        총 사용한 식비는 {request.total_cost}원이었고, 외식 중 가장 많았던 유형은 '{request.most_common_restaurant_type}'이었어.
        이번 달에 기록된 몸무게는 {request.weight_records}야.
        말투는 ~요로 끝나게끔 해주고 친근한 말투로 부탁해.
        """

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": base_prompt},
            ],
        )

        return {"response": response.choices[0].message['content']}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))