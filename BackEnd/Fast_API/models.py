from pydantic import BaseModel
from typing import List, Dict
from datetime import date 

class GPTRequest(BaseModel):
    prompt: str

class Restaurant(BaseModel):
    restaurants_name: str
    restaurants_type: str

# 메뉴에 대한 데이터 구조 정의
class MenuItem(BaseModel):
    restaurant: Restaurant
    menu_name: str  # 메뉴 이름
    menu_price: int
    menu_type: str 
    menu_value: int
    menu_carbohydrate : int
    menu_protein : int
    menu_fat : int
    menu_calories: int

class WeightItem(BaseModel):
    date: date
    weight: float

# 요청 모델 정의
class DayDiaryRequest(BaseModel):
    goal_kcal: int
    goal_cost: int  # 한 달 목표 식비
    day_diary: List[MenuItem]  # 하루 동안 먹은 메뉴 리스트

class WeekDiaryRequest(BaseModel):
    goal_kcal: int
    goal_cost: int
    day_diaries: List[MenuItem]

class MonthDiaryRequest(BaseModel):
    weight: List[WeightItem]
    goal_weight : float
    goal_cost : int
    day_diaries: List[MenuItem]
