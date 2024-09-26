
import logging  # 추가된 부분
# from models import GPTRequest, DayDiaryRequest, WeekDiaryRequest, MonthDiaryRequest
from fastapi import APIRouter, HTTPException
from models import FoodInfo
from pydantic import BaseModel
from database import engineconn

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

engine = engineconn()
session = engine.sessionmaker()

# 일간 총평 엔드포인트
@router.get("/test")
async def test():
    try:
        # 로그 출력
        example = session.query(FoodInfo).all()
        return example
    
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

