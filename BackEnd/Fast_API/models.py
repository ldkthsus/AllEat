from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class DayDiaryRequest(BaseModel):
    total_carbohydrates: Optional[float] = None
    total_proteins: Optional[float] = None
    total_fats: Optional[float] = None
    total_calories: Optional[int] = None
    total_cost: Optional[int] = None
    goal_weight: Optional[float] = None  # 추가된 목표 체중
    goal_cost: Optional[int] = None      # 추가된 목표 식비
    recent_weight: Optional[float] = None  # 추가된 현재 체중

class WeightRecord(BaseModel):
    date: date
    weight: float

class WeekDiaryRequest(BaseModel):
    goal_weight: Optional[float] = None  # 목표 체중
    goal_cost: Optional[int] = None      # 목표 식비
    recent_weight: Optional[float] = None  # 현재 체중
    average_carbohydrates: Optional[float] = None  # 평균 탄수화물
    average_proteins: Optional[float] = None       # 평균 단백질
    average_fats: Optional[float] = None           # 평균 지방
    average_calories: Optional[float] = None       # 평균 칼로리
    total_cost: Optional[int] = None               # 총 사용한 식비
    most_common_restaurant_type: Optional[dict] = None  # 레스토랑 타입 순위

class MonthDiaryRequest(BaseModel):
    goal_weight: Optional[float] = None
    goal_cost: Optional[int] = None
    weight_records: List[WeightRecord]
    average_carbohydrates: Optional[float] = None
    average_proteins: Optional[float] = None
    average_fats: Optional[float] = None
    average_calories: Optional[float] = None
    total_cost: Optional[int] = None
    most_common_restaurant_type: Optional[str] = None
