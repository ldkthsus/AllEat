import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IntroScreen from '../features/auth/IntroScreen/IntroScreen';
import MyPageScreen from '../features/auth/MyPageScreen/MyPageScreen';
import MyPageUpdateScreen from '../features/auth/MyPageUpdateScreen/MyPageUpdateScreen';
import InitialScreen from '../features/auth/InitialScreen/InitialScreen';
import SignIn from '../features/auth/SignInScreen/SignInScreen';
import SignUp from '../features/auth/SignUpScreen/SignUpScreen';
import HomeScreen from '../features/home/HomeScreen/HomeScreen';
import Agreement from '../features/paymoney/AgreementScreen/AgreementScreen';
import Paymoney from '../features/paymoney/PaymoneyScreen/PaymoneyScreen';
import PaymoneyDetail from '../features/paymoney/PaymoneyScreen/PaymoneyDetailScreen';
import Report from '../features/report/ReportScreen';
import AppBar from '../components/AppBar/AppBar';
import {useNavigationState} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store'; // Redux 스토어 타입
import DiaryCreateScreen from '../features/home/DiaryCreateScreen/DiaryCreateScreen';
import AllEatLog from '../features/alleatlog/AllEatLog'; 
const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigationState = useNavigationState(state => state);

  // 현재 네비게이션 상태가 없으면 기본적으로 AppBar를 숨깁니다
  const currentRouteName = navigationState
    ? navigationState.routes[navigationState.index].name
    : null;

  // 특정 화면에서는 AppBar를 숨기고 싶은 경우
  const shouldShowAppBar =
    currentRouteName &&
    !['Intro', 'SignUp', 'SignIn', 'Initial', 'Agreement'].includes(
      currentRouteName,
    );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  ); // Redux에서 로그인 상태 확인
  // 초기 경로를 조건에 따라 설정
  const initialRoute = isAuthenticated ? 'Home' : 'Intro'; // 조건에 따라 초기 경로 설정

  return (
    <>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DiaryCreate"
          component={DiaryCreateScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Agreement"
          component={Agreement}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Paymoney"
          component={Paymoney}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymoneyDetail"
          component={PaymoneyDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyPageUpdate"
          component={MyPageUpdateScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AllEatLog"
          component={AllEatLog}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      {shouldShowAppBar && <AppBar />}
    </>
  );
};

export default AppNavigator;
