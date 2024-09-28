import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import { styles } from './DailyReport.styles';
import { icons } from '../../../constants';
import { images } from '../../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import AIReport from '../components/AIReport';
import api from '../../../utils/api';
import DailyMealReport from './DailyMealReport';
import DailyFeeReport from './DailyFeeReport';

const DailyReport: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [reportData, setReportData] = useState<any>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0); // 이미지 인덱스를 위한 상태 추가

  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  const goalKcal = useSelector((state: RootState) => state.info.goal_kcal);
  const goalFee = useSelector((state: RootState) => state.info.goal_cost);
  const goalWeight = useSelector((state: RootState) => state.info.goal_weight);
  const recentWeight = useSelector((state: RootState) => state.info.weights);
  const firstWeight = recentWeight && recentWeight.length > 0 ? recentWeight[0].weight : null;

  const token = useSelector((state: RootState) => state.auth.token);


  const handlePreviousDate = () => {
    setCurrentDate(prevDate => subDays(prevDate, 1));
  };

  const handleNextDate = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
  };

  // 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post('/AllEat/day-report', {
          day: formattedDate,
        });
        const data = response.data;
        setReportData(data); // 서버로부터 받은 데이터를 상태에 저장
        
        // AI에게 보낼 데이터를 준비
        const aiData = {
          food_details: data.food_details,
          goal_weight: goalWeight,
          goal_cost: goalFee,
          recent_weight: firstWeight,
        };
        
        console.log('데이터 확인', aiData)
        // FastAPI에 요청 보내기
        const aiResponse = await fetch('https://j11b104.p.ssafy.io/fast-api/fast-api/report/day', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(aiData),
        });

        if (aiResponse.ok) {
          const aiResult = await aiResponse.json();
          setAiResponse(aiResult.response); // AI 응답 저장
        } else {
          console.error('AI 응답 오류:', aiResponse.statusText);
          setAiResponse('AI 응답을 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData();
  }, [formattedDate, goalWeight, goalFee, firstWeight]); // 필요한 종속성 추가

  // 이미지가 바뀌는 로직 설정
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % 2); // 0, 1 반복
    }, 500); // 0.5초마다 이미지 변경

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 interval 정리
  }, []);

  // 이미지 배열 생성
  const kikiImages = [images.kikiRunning1, images.kikiRunning2];

  // 데이터를 받아오기 전 로딩 처리
  if (!reportData) {
    return (
      <View style={styles.loadingContainer}>
        {React.createElement(kikiImages[imageIndex], { width: 200, height: 200 })}
      </View>
    );
  }

  // 전체 영양소 및 가격 합계 계산
  const totalValues = reportData.food_details.reduce(
    (acc, item) => ({
      totalPrice: acc.totalPrice + item.menu_price,
      totalCarbohydrate: acc.totalCarbohydrate + item.menu_carbohydrate,
      totalProtein: acc.totalProtein + item.menu_protein,
      totalCalories: acc.totalCalories + item.menu_calories,
      totalFat: acc.totalFat + item.menu_fat,
    }),
    { totalPrice: 0, totalCarbohydrate: 0, totalProtein: 0, totalCalories: 0, totalFat: 0 }
  );

  // 탄수화물, 단백질, 지방 객체 생성
  const carbohydrates = reportData.food_details.map(item => ({
    menuName: item.menu_name,
    menuCarbohydrate: item.menu_carbohydrate,
  }));

  const proteins = reportData.food_details.map(item => ({
    menuName: item.menu_name,
    menuProtein: item.menu_protein,
  }));

  const fats = reportData.food_details.map(item => ({
    menuName: item.menu_name,
    menuFat: item.menu_fat,
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
      <View style={styles.AIContainer}>
      <icons.mypage style={styles.AIIcon} width={30} height={30} />
      <Text style={styles.AITitleText}>AllEat! 오늘의 레포트</Text>
        {aiResponse ? (
          <AIReport title='AllEat! 오늘의 레포트' aiData={aiResponse} />
        ) : (
          <View style={styles.loadingContainer}>
            {React.createElement(kikiImages[imageIndex], { width: 200, height: 200 })}
            <Text style={styles.lodingText}>키키가 AI 레포트를 배달 중이에요</Text>
            <Text style={styles.lodingText}>조금만 기다려 주세요!</Text>
          </View>
        )}
        </View>

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
          foodDetails={reportData.food_details} // food_details를 전달
        />
      </View>
    </ScrollView>
  );
};

export default DailyReport;
