// WeeklyReport.tsx
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import { icons } from '../../../constants';
import { styles } from './WeeklyReport.styles';
import AIReport from '../components/AIReport';
import WeeklyMealReport from './WeeklyMealReport';
import WeeklyFeeReport from './WeeklyFeeReport';
import { reportData } from './ReportData';

const WeeklyReport: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // 7일 전의 날짜 계산
  const startDate = subDays(currentDate, 6);
  
  // 날짜 포맷: YYYY. MM. DD
  const formattedDate = `${format(startDate, 'yyyy. MM. dd')} - ${format(currentDate, 'yyyy. MM. dd')}`;

  const handlePreviousDate = () => {
    // 일주일 전으로 이동
    setCurrentDate(prevDate => subDays(prevDate, 7));
  };

  const handleNextDate = () => {
    // 일주일 후로 이동
    setCurrentDate(prevDate => addDays(prevDate, 7));
  };

  const goalKcal = 13000;
  const goalFee = 90000;
  
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
      <AIReport
        title='AllEat! 주간 레포트'
        aiData={reportData.gptResponse} />

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
