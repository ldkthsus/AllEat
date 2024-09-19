import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IntroScreen from '../features/auth/IntroScreen/IntroScreen';
import InitialScreen from '../features/auth/InitialScreen/InitialScreen';
import SignIn from '../features/auth/SignInScreen/SignInScreen';
import SignUp from '../features/auth/SignUpScreen/SignUpScreen';
import HomeScreen from '../features/home/HomeScreen/HomeScreen';
import AppBar from '../components/AppBar/AppBar';
import {useNavigationState} from '@react-navigation/native';

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
    !['Intro', 'SignUp', 'SignIn', 'Initial'].includes(currentRouteName);

  return (
    <>
      <Stack.Navigator initialRouteName="Intro">
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
          name="Initial"
          component={InitialScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      {shouldShowAppBar && <AppBar />}
    </>
  );
};

export default AppNavigator;
