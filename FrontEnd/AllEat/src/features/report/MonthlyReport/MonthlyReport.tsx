// MonthlyReport.tsx
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { format, addMonths, subMonths } from 'date-fns';
import { icons } from '../../../constants';
import { styles } from './MonthlyReport.styles';
import AIReport from '../components/AIReport';
import MonthlyMealReport from './MonthlyMealReport';
import MonthlyFeeReport from './MonthlyFeeReport';
import MonthlyWeightReport from './MonthlyWeightReport';
import { reportData } from './ReportData';

const MonthlyReport: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // 현재 날짜의 달을 "YYYY. MM" 형식으로 포맷
  const formattedDate = format(currentDate, 'yyyy. MM');

  const handlePreviousDate = () => {
    // 한 달 전으로 이동
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextDate = () => {
    // 한 달 후로 이동
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  const goalKcal = 13000;
  const goalFee = 90000;
  const paymoneyCost = 1300000;
  
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
      <AIReport
        title='AllEat! 월간 레포트'
        aiData={reportData.gptResponse} />
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
          goalFee={goalFee}
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
