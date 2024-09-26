import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import DailyReport from './DailyReport/DailyReport';
import WeeklyReport from './WeeklyReport/WeeklyReport';
import MonthlyReport from './MonthlyReport/MonthlyReport';
import { styles } from './ReportScreen.styles';

const ReportScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'daily' | 'weekly' | 'monthly'>('daily'); // 현재 선택된 탭 상태 관리

  // 렌더링할 컴포넌트 결정
  const renderReport = () => {
    switch (selectedTab) {
      case 'daily':
        return <DailyReport />;
      case 'weekly':
        return <WeeklyReport />;
      case 'monthly':
        return <MonthlyReport />;
      default:
        return null;
    }
  };

  return (
    <View>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('daily')}>
          <Text style={[styles.topText, selectedTab === 'daily' && styles.selectedText]}>
            일간
          </Text>
        </TouchableOpacity>
        <Text style={styles.topSlash}>|</Text>
        <TouchableOpacity onPress={() => setSelectedTab('weekly')}>
          <Text style={[styles.topText, selectedTab === 'weekly' && styles.selectedText]}>
            주간
          </Text>
        </TouchableOpacity>
        <Text style={styles.topSlash}>|</Text>
        <TouchableOpacity onPress={() => setSelectedTab('monthly')}>
          <Text style={[styles.topText, selectedTab === 'monthly' && styles.selectedText]}>
            월간
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.container}>
        <ScrollView>
          {renderReport()}
        </ScrollView>
      </View>
    </View>
  );
};

export default ReportScreen;
