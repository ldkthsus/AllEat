import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {icons} from '../../../constants';
import {styles} from './HomeScreen.styles';
import {format, addDays, subDays} from 'date-fns'; // 날짜 형식을 위해 date-fns 사용

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // 현재 날짜를 저장하는 상태
  const [currentDate, setCurrentDate] = useState(new Date());

  // 날짜를 포맷팅하는 함수 (오늘, yyyy/MM/dd 형식)
  const formatDate = (date: Date) => {
    const today = new Date();
    if (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    ) {
      return '오늘'; // 오늘이면 "오늘"로 표시
    } else if (
      today.getDate() - 1 === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    ) {
      return '어제';
    } else if (
      today.getDate() + 1 === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    ) {
      return '내일';
    }
    return format(date, 'MM/dd'); // 그 외에는 날짜를 yyyy/MM/dd 형식으로 표시
  };

  // 이전 날짜로 이동
  const handlePreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1)); // 하루를 뺌
  };

  // 다음 날짜로 이동
  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1)); // 하루를 더함
  };

  return (
    <View style={styles.topbar}>
      <TouchableOpacity onPress={handlePreviousDay}>
        <icons.arrowBackLeft
          style={styles.arrowBackLeft}
          height={30}
          width={30}
        />
      </TouchableOpacity>

      <Text style={styles.day}>{formatDate(currentDate)}</Text>

      <TouchableOpacity onPress={handleNextDay}>
        <icons.arrowBackRight
          style={styles.arrowBackRight}
          height={30}
          width={30}
        />
      </TouchableOpacity>

      <icons.notifications
        style={styles.notificationIcon}
        height={20}
        width={20}
      />
      <icons.notiBadge style={styles.notiBadge} height={10} width={10} />
    </View>
  );
};

export default HomeScreen;
