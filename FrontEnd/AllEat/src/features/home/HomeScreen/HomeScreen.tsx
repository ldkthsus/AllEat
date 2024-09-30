import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Modal} from 'react-native';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {icons} from '../../../constants';
import {images} from '../../../constants';
import {styles} from './HomeScreen.styles';
import {format, addDays, subDays} from 'date-fns'; // 날짜 형식을 위해 date-fns 사용
import CircularProgress from '../../../components/CircularProgress/CircularProgress';
import RecordBox from '../../../components/RecordBox/RecordBox';
import RecordDetailModal from '../components/RecordDetailModal/RecordDetailModal';
import {formatDate} from '../../../utils/dateUtils'; // formatDate 유틸리티 함수 가져오기
import api from '../../../utils/api';
import {AppDispatch,RootState} from '../../../redux/store';
import {useDispatch,useSelector} from 'react-redux'; // Redux에서 액션을 디스패치하기 위한 훅
import {fetchUserInfo} from '../../../redux/features/infoSlice';
import FormModal from '../../../components/FormModal/FormModal';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;
const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute<HomeRouteProp>();
  const {isUpdated = false} = route.params || {};

  const [weightModalVisible, setWeightModalVisible] = useState(false);

  // 현재 날짜를 저장하는 상태
  const [currentDate, setCurrentDate] = useState(new Date());

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
    navigation.navigate('Report'); // 'ReportScreen'은 이동할 페이지의 이름입니다.
  };
  // 모달 가시성 및 선택된 기록 관리
  const [isRecordDetailVisible, setIsRecordDetailVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<{
    id: number;
    title: string;
    kcal: string;
    price: string;
  } | null>(null);

  // 리덕스 스토어에서 사용자 정보 가져오기
  const {goal_cost, goal_kcal,weights,goal_weight} = useSelector((state: RootState) => state.info);
  // const {monthlyUsedAmount} = useSelector((state: RootState) => state.paymoney);

  // 기록된 데이터 상태
  const [dayData, setDayData] = useState<{
    day_kcal: number | null;
    day_carb: number | null;
    day_protein: number | null;
    day_fat: number | null;
    day_cost: number | null;
    day_diaries: Array<{
      diary_id: number;
      diary_time: string;
      diary_kcal: number;
      diary_cost: number;
    }>;
  } | null>(null);
  // 날짜가 변경될 때마다 API로 데이터 가져오기
  const DiaryIds = {
    BREAKFAST:
      dayData?.day_diaries.find(diary => diary.diary_time === 'BREAKFAST')
        ?.diary_id || null,
    LUNCH:
      dayData?.day_diaries.find(diary => diary.diary_time === 'LUNCH')
        ?.diary_id || null,
    DINNER:
      dayData?.day_diaries.find(diary => diary.diary_time === 'DINNER')
        ?.diary_id || null,
    SNACK:
      dayData?.day_diaries.find(diary => diary.diary_time === 'SNACK')
        ?.diary_id || null,
  };
  const handleRecordBoxPress = (isRecorded: boolean, title: string) => {
    if (isRecorded) {
      // 이미 기록된 경우 모달 표시
      const record = dayData?.day_diaries.find(
        diary => diary.diary_time === title.toUpperCase(),
      );
      setSelectedRecord({
        id: record ? record.diary_id : 0,
        title,
        kcal: record ? `${record.diary_kcal}kcal` : '0kcal',
        price: record ? `${record.diary_cost}₩` : '0₩',
      });
      setIsRecordDetailVisible(true);
    } else if (isRecordDetailVisible) {
      // 기록되지 않은 경우 DiaryCreate 페이지로 이동
      setIsRecordDetailVisible(false);
      navigation.navigate('DiaryCreate', {
        diaryId: DiaryIds,
        date: format(currentDate, 'yyyy-MM-dd'),
        meals: title,
      });
    } else {
      navigation.navigate('DiaryCreate', {
        diaryId: DiaryIds,
        date: format(currentDate, 'yyyy-MM-dd'),
        meals: title,
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = format(currentDate, 'yyyy-MM-dd'); // 날짜를 'yyyy-MM-dd' 형식으로 포맷
        const response = await api.get(`/AllEat/get/main/${formattedDate}`);
        setDayData(response.data); // 가져온 데이터를 상태에 저장
        console.log('오늘의 데이터 : ', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    if (isUpdated) {
      fetchData();
    }
  }, [currentDate, isUpdated]); // currentDate가 변경될 때마다 데이터 다시 가져오기

  // 모달 닫기 함수
  const closeModal = () => {
    setIsRecordDetailVisible(false);
    setSelectedRecord(null);
  };

  const totalNutrients =
    (dayData?.day_carb || 0) +
    (dayData?.day_protein || 0) +
    (dayData?.day_fat || 0);

  // 각 영양소의 비율 계산
  const carbRatio = totalNutrients
    ? (dayData?.day_carb || 0) / totalNutrients
    : 0;
  const proteinRatio = totalNutrients
    ? (dayData?.day_protein || 0) / totalNutrients
    : 0;
  const fatRatio = totalNutrients
    ? (dayData?.day_fat || 0) / totalNutrients
    : 0;

  // isToday 함수 추가
const isToday = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

  // 체중 기록 관련
  const handleWeightChange = async (
    currentWeight: string,
    goalWeight: string,
  ) => {
    // goal에 대한 POST 요청

    console.log('Saving current weight:', currentWeight);
    console.log('Saving goal weight:', goalWeight);
    const goalResponse = await api.put('/AllEat/users/goals', {
      goal_weight: parseFloat(goalWeight),
      goal_cost: goal_cost,
    });
    console.log('Goal Response:', goalResponse.data);
    // weight에 대한 POST 요청
    if (weights && weights.length > 0 && isToday(weights[0].createdAt)) {
      // 오늘의 체중이 있으면 PUT 요청
      const weightResponse = await api.put('/AllEat/weight', {
        weight: parseFloat(currentWeight),
      });
      console.log('Weight (PUT) Response:', weightResponse.data);
    } else {
      // 오늘의 체중이 없거나 weights가 비었으면 POST 요청
      const weightResponse = await api.post('/AllEat/weight', {
        weight: parseFloat(currentWeight),
      });
      console.log('Weight (POST) Response:', weightResponse.data);
    }
    dispatch(fetchUserInfo());
    setWeightModalVisible(false); // 모달을 닫음
  };



  return (
    <View style={{flex: 1}}>
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
            <Text style={styles.eatpayValue}>
              {dayData?.day_kcal ? `${dayData.day_kcal}kcal` : '0kcal'}
            </Text>
            <Text style={styles.eatpay}> 섭취, </Text>
            <Text style={styles.eatpayValue}>
              {dayData?.day_cost ? `${dayData.day_cost}원` : '0원'}
            </Text>
            <Text style={styles.eatpay}> 소비했어요!</Text>
          </View>

          <View style={styles.kikiBox}>
            <View style={styles.charInfo}>
              <images.kikiShadow
                style={styles.kikiShadow}
                height={90}
                width={90}
              />
              {dayData?.day_diaries.length === 0 ? (
                // day_diaries가 빈 배열일 때
                <images.kikiNoRecord
                  style={styles.kiki}
                  height={120}
                  width={120}
                />
              ) : dayData?.day_kcal &&
                goal_kcal &&
                dayData.day_kcal > goal_kcal ? (
                // day_kcal가 goal_kcal보다 클 때
                <images.kikiOverCal
                  style={styles.kiki}
                  height={120}
                  width={120}
                />
              ) : (
                // 그 외의 경우 기본 kiki 이미지
                <images.kiki style={styles.kiki} height={120} width={120} />
              )}
            </View>

            <View style={styles.nutrientInfo}>
              <View style={styles.allText}>
                <icons.tan style={styles.nutrientIcon} height={15} width={15} />
                <Text style={styles.nutrientText}>
                  탄수화물{' '}
                  <Text style={styles.nutrientCarb}>
                    {dayData?.day_carb ? `${dayData.day_carb}g` : '0g'}
                  </Text>
                </Text>
              </View>

              <View style={styles.allText}>
                <icons.dan style={styles.nutrientIcon} height={15} width={15} />
                <Text style={styles.nutrientText}>
                  단백질{' '}
                  <Text style={styles.nutrientCarb}>
                    {dayData?.day_protein ? `${dayData.day_protein}g` : '0g'}
                  </Text>
                </Text>
              </View>

              <View style={styles.allText}>
                <icons.ji style={styles.nutrientIcon} height={15} width={15} />
                <Text style={styles.nutrientText}>
                  지방{' '}
                  <Text style={styles.nutrientCarb}>
                    {dayData?.day_fat ? `${dayData.day_fat}g` : '0g'}
                  </Text>
                </Text>
              </View>

              <View style={styles.gaugeBox}>
                {/* 탄수화물 비율에 맞춘 바 */}
                <View
                  style={[
                    styles.gaugeSegment,
                    {
                      width: `${carbRatio * 100}%`, // 탄수화물 비율
                      backgroundColor: '#B0C5FF', // 탄수화물 색상
                      borderTopLeftRadius: 7,
                      borderBottomLeftRadius: 7,
                    },
                  ]}
                />
                {/* 단백질 비율에 맞춘 바 */}
                <View
                  style={[
                    styles.gaugeSegment,
                    {
                      width: `${proteinRatio * 100}%`, // 단백질 비율
                      backgroundColor: '#769BFF', // 단백질 색상
                    },
                  ]}
                />
                {/* 지방 비율에 맞춘 바 */}
                <View
                  style={[
                    styles.gaugeSegment,
                    {
                      width: `${fatRatio * 100}%`, // 지방 비율
                      backgroundColor: '#D3DFFF', // 지방 색상
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
                progress={dayData?.day_cost && goal_cost ? Math.min(dayData.day_cost / goal_cost, 1) : 0} // 비율을 1로 제한하여 그래프가 꽉 차게 보이도록 처리
                total={goal_cost || 0} // 총 금액
                current={dayData?.day_cost ? dayData.day_cost : 0} // 현재 소비한 금액
                progressColor="#769BFF"
                currentTextColor="#769BFF" // 첫 번째 그래프의 현재 텍스트 색상
                totalTextColor="black" // 첫 번째 그래프의 총 텍스트 색상
                unit="₩" // 단위
              />
              <images.Subtract
                style={styles.overlayImage}
                height={120}
                width={120}
              />
            </View>
            <View style={styles.progressWrapper}>
              <CircularProgress
                progress={dayData?.day_kcal && goal_kcal ? Math.min(dayData.day_kcal / goal_kcal, 1) : 0} // 비율을 1로 제한하여 그래프가 꽉 차게 보이도록 처리
                total={goal_kcal || 0} // 총 칼로리
                current={dayData?.day_kcal ? dayData.day_kcal : 0} // 현재 섭취한 칼로리
                progressColor="#93AAE7"
                currentTextColor="#93AAE7" // 두 번째 그래프의 현재 텍스트 색상
                totalTextColor="black" // 두 번째 그래프의 총 텍스트 색상
                unit="kcal" // 단위
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
          <TouchableOpacity
            style={styles.reportBtn}
            onPress={handleReportNavigate}>
            <icons.arrowBackRight />
            <Text style={styles.reportBtnText}>REPORT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recordBox}>
          <RecordBox
            title="아침"
            kcal={
              String(
                dayData?.day_diaries.find(
                  diary => diary.diary_time === 'BREAKFAST',
                )?.diary_kcal,
              ) || '0'
            }
            price={
              String(
                dayData?.day_diaries.find(
                  diary => diary.diary_time === 'BREAKFAST',
                )?.diary_cost,
              ) || '0'
            }
            isRecorded={
              !!dayData?.day_diaries.find(
                diary => diary.diary_time === 'BREAKFAST',
              )
            }
            onPress={() =>
              handleRecordBoxPress(
                !!dayData?.day_diaries.find(
                  diary => diary.diary_time === 'BREAKFAST',
                ),
                'BREAKFAST',
              )
            }
          />
          <RecordBox
            title="점심"
            kcal={
              String(
                dayData?.day_diaries.find(diary => diary.diary_time === 'LUNCH')
                  ?.diary_kcal,
              ) || '0'
            }
            price={
              String(
                dayData?.day_diaries.find(diary => diary.diary_time === 'LUNCH')
                  ?.diary_cost,
              ) || '0'
            }
            isRecorded={
              !!dayData?.day_diaries.find(diary => diary.diary_time === 'LUNCH')
            }
            onPress={() =>
              handleRecordBoxPress(
                !!dayData?.day_diaries.find(
                  diary => diary.diary_time === 'LUNCH',
                ),
                'LUNCH',
              )
            }
          />
          <RecordBox
            title="저녁"
            kcal={
              String(
                dayData?.day_diaries.find(
                  diary => diary.diary_time === 'DINNER',
                )?.diary_kcal,
              ) || '0'
            }
            price={
              String(
                dayData?.day_diaries.find(
                  diary => diary.diary_time === 'DINNER',
                )?.diary_cost,
              ) || '0'
            }
            isRecorded={
              !!dayData?.day_diaries.find(
                diary => diary.diary_time === 'DINNER',
              )
            }
            onPress={() =>
              handleRecordBoxPress(
                !!dayData?.day_diaries.find(
                  diary => diary.diary_time === 'DINNER',
                ),
                'DINNER',
              )
            }
          />
          <RecordBox
            title="간식"
            kcal={
              String(
                dayData?.day_diaries.find(diary => diary.diary_time === 'SNACK')
                  ?.diary_kcal,
              ) || '0'
            }
            price={
              String(
                dayData?.day_diaries.find(diary => diary.diary_time === 'SNACK')
                  ?.diary_cost,
              ) || '0'
            }
            isRecorded={
              !!dayData?.day_diaries.find(diary => diary.diary_time === 'SNACK')
            }
            onPress={() =>
              handleRecordBoxPress(
                !!dayData?.day_diaries.find(
                  diary => diary.diary_time === 'SNACK',
                ),
                'SNACK',
              )
            }
          />
        </View>
        <View style={styles.weightBox}>
        <View style={styles.boxContainer}>
            <View style={styles.box}>
              <View style={styles.titleBox}>
                <TouchableOpacity
                  style={styles.boxIcon}
                  onPress={() => setWeightModalVisible(true)}>
                  <icons.settingsWhite height={20} width={20} />
                </TouchableOpacity>
                <icons.scale height={20} width={20} />
                <Text style={styles.boxText}>목표 체중 변경{goal_kcal}</Text>
              </View>
              <View style={styles.textBox}>
                <View style={styles.text}>
                  <Text style={styles.textTitle}>현재 체중</Text>
                  <Text style={styles.textDiscription}>
                    {weights && weights.length > 0 && weights[0].weight} kg
                  </Text>
                </View>
                <View style={styles.text}>
                  <Text style={styles.textTitle}>목표 체중</Text>
                  <Text style={styles.textDiscription}>{goal_weight} kg</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <FormModal
            visible={weightModalVisible}
            title="현재 체중 입력"
            initialValue={String(
              weights && weights.length > 0 && weights[0].weight,
            )}
            anotherTitle="목표 체중 입력"
            anotherInitialValue={String(goal_weight)}
            onClose={() => setWeightModalVisible(false)}
            onSave={handleWeightChange}
            isWeight={true}
            keyboardType="numeric"
          />

      </ScrollView>
      {/* RecordDetail 모달 */}
      {selectedRecord && (
        <Modal
          visible={isRecordDetailVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <RecordDetailModal
              id={selectedRecord.id}
              title={selectedRecord.title}
              date={formatDate(currentDate)}
              kcal={selectedRecord.kcal}
              price={selectedRecord.price}
              onClose={closeModal}
              onPress={() => handleRecordBoxPress(false, selectedRecord.title)}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default HomeScreen;
// export type RootState = ReturnType<typeof store.getState>;
