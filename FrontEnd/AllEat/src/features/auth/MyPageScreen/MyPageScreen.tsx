import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {images} from '../../../constants';
import {icons} from '../../../constants';
import {styles} from './MyPageScreen.styles'; // 분리된 스타일을 임포트
import CustomButton from '../../../components/CustomButton';
import {useDispatch} from 'react-redux'; // Redux에서 액션을 디스패치하기 위한 훅
import {logout} from '../../../redux/features/authSlice'; // 로그아웃 액션 임포트
import {AppDispatch} from '../../../redux/store';
import UserInfo from '../components/UserInfo/UserInfo';

type MyPageScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MyPage'
>;
const MyPageScreen: React.FC = () => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    // 로그아웃 액션 디스패치
    dispatch(logout());
    navigation.navigate('Intro');
  };
  return (
    <ScrollView>
      <View style={styles.body}>
        <View style={styles.myPageBody}>
          <View style={styles.myPageTitle}>
            <Text style={styles.myPageTitleText}>마이 페이지</Text>
            <TouchableOpacity
              style={styles.myPageTitleIcon}
              onPress={() => navigation.navigate('MyPageUpdate')}>
              <icons.settings height={24} width={24} />
            </TouchableOpacity>
          </View>
          <UserInfo nickname="닉네임" email="example.com" age={24} gender="♂" />
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <View style={styles.titleBox}>
                <icons.settingsWhite
                  style={styles.boxIcon}
                  height={20}
                  width={20}
                />
                <icons.scale height={20} width={20} />
                <Text style={styles.boxText}>목표 체중 변경</Text>
              </View>
              <View style={styles.textBox}>
                <View style={styles.text}>
                  <Text style={styles.textTitle}>현재 체중</Text>
                  <Text style={styles.textDiscription}>75 kg</Text>
                </View>
                <View style={styles.text}>
                  <Text style={styles.textTitle}>목표 체중</Text>
                  <Text style={styles.textDiscription}>65 kg</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <View style={styles.titleBox}>
                <icons.settingsWhite
                  style={styles.boxIcon}
                  height={20}
                  width={20}
                />
                <icons.wallet height={20} width={20} />
                <Text style={styles.boxText}>목표 식비 변경</Text>
              </View>
              <View style={styles.textBox}>
                <View style={styles.text}>
                  <Text style={styles.textTitle}>목표 식비</Text>
                  <Text style={styles.textDiscription}>₩600000</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <View style={styles.titleBox}>
                <icons.settingsWhite
                  style={styles.boxIcon}
                  height={20}
                  width={20}
                />
                <icons.clock height={20} width={20} />
                <Text style={styles.boxText}>알람 시간 변경</Text>
              </View>
              <View style={styles.alarmBox}>
                <View style={styles.alarm}>
                  <images.breakfast height={24} width={24} />
                  <Text style={styles.textDiscription}>08:00</Text>
                </View>
                <View style={styles.alarm}>
                  <images.lunch height={24} width={24} />
                  <Text style={styles.textDiscription}>12:00</Text>
                </View>
                <View style={styles.alarm}>
                  <images.dinner height={24} width={24} />
                  <Text style={styles.textDiscription}>18:00</Text>
                </View>
              </View>
            </View>
          </View>
          <CustomButton
            title="로그아웃"
            handlePress={handleLogout}
            containerStyles="w-[40%] h-[60px] m-3" // Tailwind 스타일 전달
            textStyles="text-white font-pbold" // Tailwind 스타일 전달
            isLoading={false} // 로딩 상태 설정
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default MyPageScreen;
