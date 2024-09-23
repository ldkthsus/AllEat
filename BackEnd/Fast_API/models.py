from pydantic import BaseModel
from typing import List, Dict
from datetime import date 

from pydantic import BaseModel

class DayDiaryRequest(BaseModel):
    total_carbohydrates: float
    total_proteins: float
    total_fats: float
    total_calories: int
    total_cost: int
    goal_weight: float  # 추가된 목표 체중
    goal_cost: int      # 추가된 목표 식비
    recent_weight: float  # 추가된 현재 체중

class WeightRecord(BaseModel):
    date: date
    weight: float

class WeekDiaryRequest(BaseModel):
    goal_weight: float  # 목표 체중
    goal_cost: int      # 목표 식비
    recent_weight: float  # 현재 체중
    average_carbohydrates: float
    average_proteins: float
    average_fats: float
    average_calories: float
    total_cost: int
    most_common_restaurant_type: str

class MonthDiaryRequest(BaseModel):
    goal_weight: float
    goal_cost: int
    weight_records: List[WeightRecord]
    average_carbohydrates: float
    average_proteins: float
    average_fats: float
    average_calories: float
    total_cost: int
    most_common_restaurant_type: str