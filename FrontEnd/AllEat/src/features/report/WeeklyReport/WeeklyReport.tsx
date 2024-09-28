import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import { icons } from '../../../constants';
import { images } from '../../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { styles } from './WeeklyReport.styles';
import AIReport from '../components/AIReport';
import api from '../../../utils/api';
import WeeklyMealReport from './WeeklyMealReport';
import WeeklyFeeReport from './WeeklyFeeReport';

const WeeklyReport: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [reportData, setReportData] = useState<any>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const startDate = subDays(currentDate, 6);
  const formattedDate = `${format(startDate, 'yyyy. MM. dd')} - ${format(currentDate, 'yyyy. MM. dd')}`;
  const postDate = format(currentDate, 'yyyy-MM-dd');

  const goalKcal = useSelector((state: RootState) => state.info.goal_kcal);
  const goalFee = useSelector((state: RootState) => state.info.goal_cost);


  // API 요청 useEffect
  useEffect(() => {
    console.log('WeeklyReport useEffect 실행됨');
    const fetchData = async () => {
      try {
        console.log('보내는 날짜:', postDate);
        const response = await api.post('/AllEat/week-report', {
          day: postDate,
        });
        console.log('데이터 확인', response.data.cost_where);
        setReportData(response.data);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };
    fetchData();
  }, [postDate]);

  // 날짜 변경 핸들러
  const handlePreviousDate = () => setCurrentDate(prevDate => subDays(prevDate, 7));
  const handleNextDate = () => setCurrentDate(prevDate => addDays(prevDate, 7));

  // 로딩 상태 관리
  useEffect(() => {
    setReportData(null);
  }, [currentDate]);

  // 이미지 변경 로직
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
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.weeklyReportContainer}>
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
      <AIReport title='AllEat! 주간 레포트' aiData="임시" />

      <View style={styles.ReportContainer}>
        {/* 식단 레포트 영역 */}
        <WeeklyMealReport
          goalKcal={goalKcal}
          kcalAverage={reportData.kcal_average}
          proteinAvg={reportData.protein_avg}
          carbAvg={reportData.carb_avg}
          costAvg={reportData.cost_avg}
          fatAvg={reportData.fat_avg}
          proteinRanking={reportData.protein_ranking}
          kcalRanking={reportData.menu_kcal}
        />
      </View>

      {/* 식비 레포트 영역 */}
      <View style={styles.ReportContainer}>
        <WeeklyFeeReport
          goalFee={goalFee}
          costAvg={reportData.cost_avg}
          costRanking={reportData.cost_ranking}
          costWhere={reportData.cost_where}
        />
      </View>
    </ScrollView>
  );
};

export default WeeklyReport;
