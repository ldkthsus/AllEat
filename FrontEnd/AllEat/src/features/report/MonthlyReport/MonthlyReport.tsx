import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { format, addMonths, subMonths } from 'date-fns';
import { icons } from '../../../constants';
import { images } from '../../../constants';
import { styles } from './MonthlyReport.styles';
import AIReport from '../components/AIReport';
import MonthlyMealReport from './MonthlyMealReport';
import MonthlyFeeReport from './MonthlyFeeReport';
import MonthlyWeightReport from './MonthlyWeightReport';
import api from '../../../utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const MonthlyReport: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [reportData, setReportData] = useState<any>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [aiResponse, setAiResponse] = useState<string | null>(null); // AI 응답 상태 추가

  const formattedDate = format(currentDate, 'yyyy. MM');
  const postDate = format(currentDate, 'yyyy-MM');
  
  const goalKcal = useSelector((state: RootState) => state.info.goal_kcal);
  const goalFee = useSelector((state: RootState) => state.info.goal_cost);
  const monthGoalCost = goalFee ? (goalFee / 30).toFixed(0) : '0';
  const monthUsedAmount = useSelector((state: RootState) => state.paymoney.monthlyUsedAmount);
  const paymoneyCost = monthUsedAmount ?? 0; 
  const token = useSelector((state: RootState) => state.auth.token);

  
  // API 요청 useEffect
  useEffect(() => {
    console.log('MonthlyReport useEffect 실행됨');
    const fetchData = async () => {
      try {
        const response = await api.post('/AllEat/month-report', {
          year_month: postDate,
        });
        
        const data = response.data;
        console.log('체중 추이', data.monthly_weight_records)
        setReportData(data); // 서버로부터 받은 데이터를 상태에 저장
        
        // FastAPI에 요청 보내기
        const aiResponse = await fetch('https://j11b104.p.ssafy.io/fast-api/fast-api/report/month', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data), // 그대로 전달
        });

        if (aiResponse.ok) {
          const aiResult = await aiResponse.json();
          setAiResponse(aiResult.response); // AI 응답 저장
        } else {
          console.error('AI 응답 오류:', aiResponse.statusText);
          setAiResponse('AI 응답을 가져오지 못했습니다.');
        }
      } catch (error) {
        // console.error('데이터 가져오기 오류:', error);
      }
    };
    fetchData();
  }, [currentDate]); // currentDate를 의존성 배열로 사용

  const handlePreviousDate = () => setCurrentDate(prevDate => subMonths(prevDate, 1));
  const handleNextDate = () => setCurrentDate(prevDate => addMonths(prevDate, 1));

  useEffect(() => {
    setReportData(null);
  }, [currentDate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % 2);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const kikiImages = [images.kikiRunning1, images.kikiRunning2];

  if (!reportData) {
    return (
      <View style={styles.loadingContainer}>
        {React.createElement(kikiImages[imageIndex], { width: 200, height: 200 })}
      </View>
    );
  }

  return (
    <ScrollView style={styles.monthlyReportContainer}>
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
        <Text style={styles.AITitleText}>AllEat! 월간 레포트</Text>
        {aiResponse ? (
          <AIReport title='AllEat! 월간 레포트' aiData={aiResponse} />
        ) : (
          <View style={styles.loadingContainer}>
            {React.createElement(kikiImages[imageIndex], { width: 200, height: 200 })}
            <Text style={styles.loadingText}>키키가 AI 레포트를 배달 중이에요</Text>
            <Text style={styles.loadingText}>조금만 기다려 주세요!</Text>
          </View>
        )}
      </View>

      <View style={styles.ReportContainer}>
        <MonthlyWeightReport
          monthlyCostRecords={reportData.monthly_cost_records}
          monthlyWeightRecords={reportData.monthly_weight_records}
        />
      </View>
      <View style={styles.ReportContainer}>
        {/* 식단 레포트 영역 */}
        <MonthlyMealReport
          goalKcal={goalKcal}
          kcalAverage={reportData.average_calories}
          kcalRanking={reportData.kcal_ranking}
        />
      </View>
      {/* 식비 레포트 영역 */}
      <View style={styles.ReportContainer}>
        <MonthlyFeeReport
          goalFee={monthGoalCost}
          costAvg={reportData.cost_avg}
          costRanking={reportData.cost_ranking}
          costWhere={reportData.restaurant_type_count}
          totalCost={reportData.total_cost}
          paymoneyCost={paymoneyCost}
        />
      </View>
    </ScrollView>
  );
};

export default MonthlyReport;
