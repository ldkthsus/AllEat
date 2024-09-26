// DailyReport.tsx
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import { styles } from './DailyReport.styles';
import { icons } from '../../../constants';
import AIReport from '../components/AIReport';
import DailyMealReport from './DailyMealReport';
import DailyFeeReport from './DailyFeeReport';

const DailyReport: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  const handlePreviousDate = () => {
    setCurrentDate(prevDate => subDays(prevDate, 1));
  };

  const handleNextDate = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
  };

  // AI 레포트 dummyData
  const reportData = {
    "gptResponse": "식사는 균형 잡힌 영양소를 섭취하셨습니다. 그러나 칼로리 섭취는 체중감량을 위해 너무 높아요. 식비 측면에서는 한 달 목표치에 비해 매일 비용이 높아 조절이 필요해 보입니다.",
    "foodDetails": [
      {
        "menuPrice": 8000,
        "menuCarbohydrate": 80.0,
        "restaurantName": "한민순대",
        "restaurantType": "RESTAURANTS",
        "menuName": "순대국밥",
        "menuProtein": 30.0,
        "menuCalories": 450,
        "menuFat": 20.0
      },
      {
        "menuPrice": 8000,
        "menuCarbohydrate": 80.0,
        "restaurantName": "봉준국밥",
        "restaurantType": "RESTAURANTS",
        "menuName": "순대국밥",
        "menuProtein": 30.0,
        "menuCalories": 450,
        "menuFat": 20.0
      },
      {
        "menuPrice": 8000,
        "menuCarbohydrate": 80.0,
        "restaurantName": "한민순대",
        "restaurantType": "RESTAURANTS",
        "menuName": "머리국밥",
        "menuProtein": 30.0,
        "menuCalories": 450,
        "menuFat": 20.0
      },
      {
        "menuPrice": 8000,
        "menuCarbohydrate": 80.0,
        "restaurantName": "한민순대",
        "restaurantType": "RESTAURANTS",
        "menuName": "머리국밥",
        "menuProtein": 30.0,
        "menuCalories": 450,
        "menuFat": 20.0
      }]
  };

  const goalKcal = 2500;
  const goalFee = 28000;

  // 전체 영양소 및 가격 합계 계산
  const totalValues = reportData.foodDetails.reduce(
    (acc, item) => ({
      totalPrice: acc.totalPrice + item.menuPrice,
      totalCarbohydrate: acc.totalCarbohydrate + item.menuCarbohydrate,
      totalProtein: acc.totalProtein + item.menuProtein,
      totalCalories: acc.totalCalories + item.menuCalories,
      totalFat: acc.totalFat + item.menuFat,
    }),
    { totalPrice: 0, totalCarbohydrate: 0, totalProtein: 0, totalCalories: 0, totalFat: 0 }
  );

  // goalKcal 대비 섭취한 칼로리 비율 계산
  const caloriePercentage = (totalValues.totalCalories / goalKcal) * 100;

  // 탄수화물, 단백질, 지방 객체 생성
  const carbohydrates = reportData.foodDetails.map(item => ({
    menuName: item.menuName,
    menuCarbohydrate: item.menuCarbohydrate
  }));

  const proteins = reportData.foodDetails.map(item => ({
    menuName: item.menuName,
    menuProtein: item.menuProtein
  }));

  const fats = reportData.foodDetails.map(item => ({
    menuName: item.menuName,
    menuFat: item.menuFat
  }));

  return (
    <ScrollView style={styles.dailyReportContainer}>
      <View style={styles.dateNavigatorContainer}>
        <TouchableOpacity onPress={handlePreviousDate}>
          <icons.arrowBackLeft height={27} width={27} />
        </TouchableOpacity>
        <Text style={styles.date}>{formattedDate}</Text>
        <TouchableOpacity onPress={handleNextDate}>
          <icons.arrowBackRight height={27} width={27} />
        </TouchableOpacity>
      </View>

      {/* AI 레포트 영역 */}
      <AIReport
        title='AllEat! 오늘의 레포트'
        aiData={reportData.gptResponse} />

      <View style={styles.ReportContainer}>
        {/* 식단 레포트 영역 */}
        <DailyMealReport
          goalKcal={goalKcal}
          totalCalories={totalValues.totalCalories}
          totalCarbohydrate={totalValues.totalCarbohydrate}
          totalProtein={totalValues.totalProtein}
          totalFat={totalValues.totalFat}
          carbohydrates={carbohydrates}
          proteins={proteins}
          fats={fats}
        />
      </View>
      {/* 식비 레포트 영역 */}
      <View style={styles.ReportContainer}>
        <DailyFeeReport
          goalFee={goalFee}
          totalPrice={totalValues.totalPrice}
          foodDetails={reportData.foodDetails}
        />
      </View>
    </ScrollView>
  );
};

export default DailyReport;
