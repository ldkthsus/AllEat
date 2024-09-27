import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { icons } from '../../../constants';
import { images } from '../../../constants';
import { styles } from './HomeScreen.styles';
import { format, addDays, subDays } from 'date-fns'; // 날짜 형식을 위해 date-fns 사용
import CircularProgress from '../../../components/CircularProgress/CircularProgress';
import RecordBox from '../../../components/RecordBox/RecordBox';

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

  // REPORT 버튼 클릭 시 다른 페이지로 이동하는 함수
  const handleReportNavigate = () => {
    navigation.navigate('ReportScreen'); // 'ReportScreen'은 이동할 페이지의 이름입니다.
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 고정된 상단 바 */}
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

      {/* 스크롤 가능한 콘텐츠 */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mainbox}>
          <View style={styles.allText}>
            <icons.re_check
              style={styles.re_checkIcon}
              height={15}
              width={15}
            />
            <Text style={styles.eatpay}> 총 </Text>
            <Text style={styles.eatpayValue}>3301kcal</Text>
            <Text style={styles.eatpay}> 섭취, </Text>
            <Text style={styles.eatpayValue}>5800원</Text>
            <Text style={styles.eatpay}> 소비했어요!</Text>
          </View>

          <View style={styles.kikiBox}>
            <View style={styles.charInfo}>
              <images.kikiShadow
                style={styles.kikiShadow}
                height={90}
                width={90}
              />
              <images.kiki style={styles.kiki} height={120} width={120} />
            </View>

            <View style={styles.nutrientInfo}>
              <View style={styles.allText}>
                <icons.tan
                  style={styles.nutrientIcon}
                  height={15}
                  width={15}
                />
                <Text style={styles.nutrientText}>
                  탄수화물 <Text style={styles.nutrientCarb}>76.3g</Text>
                </Text>
              </View>

              <View style={styles.allText}>
                <icons.dan
                  style={styles.nutrientIcon}
                  height={15}
                  width={15}
                />
                <Text style={styles.nutrientText}>
                  단백질 <Text style={styles.nutrientCarb}>43.7g</Text>
                </Text>
              </View>

              <View style={styles.allText}>
                <icons.ji
                  style={styles.nutrientIcon}
                  height={15}
                  width={15}
                />
                <Text style={styles.nutrientText}>
                  지방 <Text style={styles.nutrientCarb}>69.1g</Text>
                </Text>
              </View>

              <View style={styles.gaugeBox}>
                <View
                  style={[
                    styles.gaugeSegment,
                    {
                      width: '40%',
                      backgroundColor: '#769BFF',
                      borderTopLeftRadius: 7,
                      borderBottomLeftRadius: 7,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.gaugeSegment,
                    { width: '22%', backgroundColor: '#4D7CFE' },
                  ]}
                />
                <View
                  style={[
                    styles.gaugeSegment,
                    {
                      width: '38%',
                      backgroundColor: '#A0BFFF',
                      borderTopRightRadius: 7,
                      borderBottomRightRadius: 7,
                    },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* 원형 그래프 */}
          <View style={styles.progressContainer}>
            <View style={styles.progressWrapper}>
              <CircularProgress
                progress={0.5}
                total={16000}
                current={5800}
                progressColor="#769BFF"
                currentTextColor="#769BFF" // 첫 번째 그래프의 현재 텍스트 색상
                totalTextColor="black" // 첫 번째 그래프의 총 텍스트 색상
                unit="₩"
              />
              <images.Subtract
                style={styles.overlayImage}
                height={120}
                width={120}
              />
            </View>
            <View style={styles.progressWrapper}>
              <CircularProgress
                progress={0.22}
                total={1520}
                current={330}
                progressColor="#93AAE7"
                currentTextColor="#93AAE7" // 두 번째 그래프의 현재 텍스트 색상
                totalTextColor="black" // 두 번째 그래프의 총 텍스트 색상
                unit="kcal"
              />
              <images.Subtract
                style={styles.overlayImage}
                height={120}
                width={120}
              />
            </View>
          </View>
        </View>

        <View style={styles.whiteBox}>
          {/* REPORT 버튼에 네비게이션 연결 */}
          <TouchableOpacity style={styles.reportBtn} onPress={handleReportNavigate}>
            <icons.arrowBackRight />
            <Text style={styles.reportBtnText}>REPORT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recordBox}>
          <images.recordBox height={150} width={150} style={styles.leftRecord} />
          <images.recordBox height={150} width={150} style={styles.rightRecord} />
        </View>

        <View style={styles.recordBox}>
          <RecordBox title="아침" kcal="330.2kcal" price="5800₩" />
          <RecordBox title="점심" kcal="400kcal" price="0₩" />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
