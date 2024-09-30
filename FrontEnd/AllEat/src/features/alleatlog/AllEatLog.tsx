import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { icons } from '../../constants'; // 아이콘은 여전히 그대로 가져옴
import { styles } from './AllEatLog.styles'; // 분리된 스타일 파일을 가져옴
import { format, addMonths, subMonths } from 'date-fns'; // 월 단위로 날짜 이동을 위해 date-fns 사용

const AllEatLog: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 이전 달로 이동하는 함수
  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1)); // 한 달을 뺌
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    console.log("Next month clicked"); // 확인용 로그 추가
    setCurrentDate(prevDate => addMonths(prevDate, 1)); // 한 달을 더함
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 고정된 상단 바 */}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={handlePreviousMonth}>
          {/* 아이콘 컴포넌트가 정상적으로 렌더링되는지 확인 */}

            <icons.arrowBackLeft style={styles.arrowBackLeft} height={30} width={30} />
        </TouchableOpacity>

        {/* 날짜 표시 (월 단위로) */}
        <Text style={styles.day}>{format(currentDate, `M월`)}</Text>

        <TouchableOpacity onPress={handleNextMonth}>
            <icons.arrowBackRight style={styles.arrowBackRight} height={30} width={30} />
        </TouchableOpacity>
          <icons.controlMonth style={styles.notificationIcon} height={20} width={20} />
      </View>

      {/* 나머지 페이지 콘텐츠를 여기 추가 */}
    </View>
  );
};

export default AllEatLog;
