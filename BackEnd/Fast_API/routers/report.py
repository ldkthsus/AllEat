from fastapi import APIRouter, HTTPException
import openai
from models import GPTRequest, DayDiaryRequest, WeekDiaryRequest, MonthDiaryRequest

router = APIRouter()

# 일간 총평 엔드포인트
@router.post("/day")
async def get_day_summary(request: DayDiaryRequest):
    try:
        # 하루 목표 식비 계산 (한 달 목표 식비를 30으로 나눈 값)
        daily_goal_cost = request.goal_cost / 30
        
        # 하루 총 비용 계산
        total_cost = sum(item.menu_price for item in request.day_diary)
        
        # 하루 총 영양소 계산
        total_carbs = sum(item.menu_carbohydrate for item in request.day_diary)
        total_protein = sum(item.menu_protein for item in request.day_diary)
        total_fat = sum(item.menu_fat for item in request.day_diary)

        # 메뉴 요약 (이름과 영양소 요약)
        menu_summary = "\n".join([
            f"{item.menu_name}: 탄수화물 {item.menu_carbohydrate}g, 단백질 {item.menu_protein}g, 지방 {item.menu_fat}g, 비용 {item.menu_price}원, 장소 {item.restaurant.restaurants_name}"
            for item in request.day_diary
        ])

        # 고정된 프롬프트 정의
        base_prompt = f"""
        너는 유능한 영양학자이자 재무 분석관이야. 
        내가 제공할 일간 식단과 식비 데이터를 보고, 영양과 비용 효율성을 고려해 100자 이내로 간단한 총평을 작성해줘.
        오늘의 목표 칼로리는 {request.goal_kcal}kcal이고, 총 비용은 {total_cost}원이었으며, 하루 목표 식비는 {daily_goal_cost}원이야.
        오늘 먹은 음식은 아래와 같아:
        {menu_summary}
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

# 주간 총평 엔드포인트
@router.post("/week")
async def get_week_summary(request: WeekDiaryRequest):
    try:
        # 주간 목표 식비 계산 (한 달 목표 식비를 4로 나눈 값)
        weekly_goal_cost = request.goal_cost / 4

        # 주간 총 비용 계산
        total_cost = sum(item.menu_price for item in request.day_diaries)
        
        # 주간 총 영양소 계산
        total_carbs = sum(item.menu_carbohydrate for item in request.day_diaries)
        total_protein = sum(item.menu_protein for item in request.day_diaries)
        total_fat = sum(item.menu_fat for item in request.day_diaries)

        # 메뉴 요약 (이름과 영양소 요약)
        menu_summary = "\n".join([
            f"{item.menu_name}: 탄수화물 {item.menu_carbohydrate}g, 단백질 {item.menu_protein}g, 지방 {item.menu_fat}g, 비용 {item.menu_price}원, 장소 {item.restaurant.restaurants_name}"
            for item in request.day_diaries
        ])

        # 고정된 프롬프트 정의
        base_prompt = f"""
        너는 유능한 영양학자이자 재무 분석관이야. 
        내가 제공할 주간 식단과 식비 데이터를 보고, 영양과 비용 효율성을 고려해 100자 이내로 간단한 총평을 작성해줘.
        이번 주의 목표 칼로리는 {request.goal_kcal}kcal이고, 총 비용은 {total_cost}원이었으며, 주간 목표 식비는 {weekly_goal_cost}원이야.
        이번 주 먹은 음식은 아래와 같아:
        {menu_summary}
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

# 월간 총평 엔드포인트
@router.post("/month")
async def get_month_summary(request: MonthDiaryRequest):
    try:
        # 월간 총 비용 계산
        total_cost = sum(item.menu_price for item in request.day_diaries)
        
        # 월간 총 영양소 계산
        total_carbs = sum(item.menu_carbohydrate for item in request.day_diaries)
        total_protein = sum(item.menu_protein for item in request.day_diaries)
        total_fat = sum(item.menu_fat for item in request.day_diaries)

        # 메뉴 요약 (이름과 영양소 요약)
        menu_summary = "\n".join([
            f"{item.menu_name}: 탄수화물 {item.menu_carbohydrate}g, 단백질 {item.menu_protein}g, 지방 {item.menu_fat}g, 비용 {item.menu_price}원, 장소 {item.restaurant.restaurants_name}"
            for item in request.day_diaries
        ])

        # 고정된 프롬프트 정의
        base_prompt = f"""
        너는 유능한 영양학자이자 재무 분석관이야. 
        내가 제공할 월간 식단과 식비 데이터를 보고, 영양과 비용 효율성을 고려해 100자 이내로 간단한 총평을 작성해줘.
        이번 달의 목표 체중은 {request.goal_weight}kg이고, 총 비용은 {total_cost}원이었으며, 이번 달 목표 식비는 {request.goal_cost}원이야.
        이번 달 먹은 음식은 아래와 같아:
        {menu_summary}
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
