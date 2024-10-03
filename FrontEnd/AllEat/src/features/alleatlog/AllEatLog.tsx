import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {icons} from '../../constants';
import {styles} from './AllEatLog.styles';
import {format, addMonths, subMonths} from 'date-fns';
import api from '../../utils/api';
import DateSection from '../../components/DateSection/DateSection'; // DateSection을 가져옴
import ko from 'date-fns/locale/ko'; // 한국어 로케일 추가

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

  // 날짜 기반 API 데이터를 가져오는 함수 (date 파라미터를 사용)
  const fetchLogData = async (date: string) => {
    setLoading(true);
    try {
      const response = await api.get('/AllEat/mealpay', {
        params: {date}, // 변경된 API 주소에 맞게 date 파라미터로 요청
      });
      setLogData(response.data); // API 응답 데이터를 저장
      console.log(response.data[0].date);
      setLoading(false);
    } catch (error) {
      console.error('데이터 가져오기 실패', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const formattedDate = format(currentDate, 'yyyy-MM');
    fetchLogData(formattedDate);
  }, [currentDate]);

  // 이전 달로 이동하는 함수
  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.body}>
      {/* 고정된 상단 바 */}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          <icons.arrowBackLeft
            style={styles.arrowBackLeft}
            height={30}
            width={30}
          />
        </TouchableOpacity>

        <Text style={styles.day}>{format(currentDate, 'M월')}</Text>

        <TouchableOpacity onPress={handleNextMonth}>
          <icons.arrowBackRight
            style={styles.arrowBackRight}
            height={30}
            width={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.allText}>
        <Text style={styles.textBlack}>나의 </Text>
        <Text style={styles.textBlue}>식단/식비 </Text>
        <Text style={styles.textBlack}>기록을 확인해 볼까요?</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {logData.map(dayLog => (
          <DateSection
            key={dayLog.date}
            date={format(new Date(dayLog.date), 'yyyy.MM.dd EEEE', {
              locale: ko,
            })}
            diaries={dayLog.diaries}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AllEatLog;
