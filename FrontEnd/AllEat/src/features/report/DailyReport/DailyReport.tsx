import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import { styles } from './DailyReport.styles';
import { icons } from '../../../constants';
import AIReport from '../components/AIReport';
import api from '../../../utils/api';
import DailyMealReport from './DailyMealReport';
import DailyFeeReport from './DailyFeeReport';

const DailyReport: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [reportData, setReportData] = useState<any>(null);
  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  const handlePreviousDate = () => {
    setCurrentDate(prevDate => subDays(prevDate, 1));
  };

  const handleNextDate = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
  };

  const goalKcal = 2500;
  const goalFee = 28000;

  // 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post('/AllEat/day-report', {
          day: formattedDate,
        });
        setReportData(response.data); // 서버로부터 받은 데이터를 상태에 저장
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData();
  }, [formattedDate]); // 날짜가 변경될 때마다 데이터 요청

  // 데이터를 받아오기 전 로딩 처리
  if (!reportData) {
    return <Text>Loading...</Text>;
  }

     // gptResponse 필터링하여 원하는 부분 추출
      let filteredGptResponse = '';
      try {
        // JSON 파싱을 시도하고 해당 response 값을 추출
        const parsedData = JSON.parse(reportData.gptResponse);
        filteredGptResponse = parsedData.response;
      } catch (error) {
        console.error('gptResponse 파싱 오류:', error);
      }

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

  // 탄수화물, 단백질, 지방 객체 생성
  const carbohydrates = reportData.foodDetails.map(item => ({
    menuName: item.menuName,
    menuCarbohydrate: item.menuCarbohydrate,
  }));

  const proteins = reportData.foodDetails.map(item => ({
    menuName: item.menuName,
    menuProtein: item.menuProtein,
  }));

  const fats = reportData.foodDetails.map(item => ({
    menuName: item.menuName,
    menuFat: item.menuFat,
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
        aiData={filteredGptResponse}
        />

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