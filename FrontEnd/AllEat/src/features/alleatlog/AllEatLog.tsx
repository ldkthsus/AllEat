import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { icons } from '../../constants'; // 아이콘을 가져옴
import { styles } from './AllEatLog.styles';
import { format, addMonths, subMonths } from 'date-fns';
import api from '../../utils/api';

interface Menu {
  menu_name: string;
  restaurant_name: string;
  menu_kcal: number;
  menu_cost: number;
}

interface Diary {
  diary_kcal: number;
  diary_cost: number;
  diary_time: string;
  menus: Menu[];
}

interface DayLog {
  date: string;
  diaries: Diary[];
}

const AllEatLog: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [logData, setLogData] = useState<DayLog[]>([]);

  // 시간에 따른 한글 번역 및 아이콘 매핑
  const timeTranslations: { [key: string]: { label: string; icon: React.FC<any> } } = {
    BREAKFAST: { label: '아침', icon: icons.logMorning },
    LUNCH: { label: '점심', icon: icons.logLunch },
    DINNER: { label: '저녁', icon: icons.logDinner },
    SNACK: { label: '간식', icon: icons.logSnack },
  };

  // 날짜 기반 API 데이터를 가져오는 함수 (date 파라미터를 사용)
  const fetchLogData = async (date: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/AllEat/mealpay`, {
        params: { date }, // 변경된 API 주소에 맞게 date 파라미터로 요청
      });
      setLogData(response.data); // API 응답 데이터를 저장
      setLoading(false);
    } catch (error) {
      console.error('데이터 가져오기 실패', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const formattedDate = format(currentDate, 'yyyy-MM'); // API가 요구하는 date 형식에 맞게 변경
    fetchLogData(formattedDate);
  }, [currentDate]);

  // 이전 달로 이동하는 함수
  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const renderDiary = (diary: Diary) => {
    const timeInfo = timeTranslations[diary.diary_time] || { label: diary.diary_time, icon: null };
    const IconComponent = timeInfo.icon; // 해당 시간에 맞는 아이콘 컴포넌트 가져오기
console.log(IconComponent)
    return (
      <View key={diary.diary_time} style={styles.diarySection}>
        <View style={styles.diaryHeader}>
          {IconComponent && (
            <IconComponent style={styles.diaryIcon} height={20} width={20} /> // 아이콘 표시
          )}
          <Text style={styles.diaryTime}>
            {timeInfo.label} {/* 시간 라벨 표시 */}
          </Text>
        </View>
        <Text style={styles.diaryInfo}>
          {diary.diary_kcal}kcal · ₩{diary.diary_cost.toLocaleString()}
        </Text>
        {diary.menus.map((menu, index) => (
          <View key={index} style={styles.menuItem}>
            <Text style={styles.menuText}>
              {menu.menu_name} ({menu.menu_kcal}kcal) - {menu.restaurant_name}
            </Text>
            <Text style={styles.menuCost}>₩{menu.menu_cost.toLocaleString()}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderDayLog = (dayLog: DayLog) => (
    <View key={dayLog.date} style={styles.dayLog}>
      <Text style={styles.dateHeader}>{dayLog.date}</Text>
      {dayLog.diaries.map((diary) => renderDiary(diary))}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* 고정된 상단 바 */}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <icons.arrowBackLeft style={styles.arrowBackLeft} height={30} width={30} />
        </TouchableOpacity>

        <Text style={styles.day}>{format(currentDate, 'M월')}</Text>

        <TouchableOpacity onPress={handleNextMonth}>
          <icons.arrowBackRight style={styles.arrowBackRight} height={30} width={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.allText}>
        <Text style={styles.textBlack}>나의 </Text>
        <Text style={styles.textBlue}>식단/식비 </Text>
        <Text style={styles.textBlack}>기록을 확인해 볼까요?</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {logData.map((dayLog) => renderDayLog(dayLog))}
      </ScrollView>
    </View>
  );
};

export default AllEatLog;
