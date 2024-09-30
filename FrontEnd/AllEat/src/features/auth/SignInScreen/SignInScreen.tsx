import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import FormField from '../../../components/FormField/FormField';
import CustomButton from '../../../components/CustomButton';
import {styles} from './SignInScreen.styles';
import {RootStackParamList} from '../../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {icons} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../redux/features/authSlice';
import {RootState} from '../../../redux/store';
import {fetchUserInfo} from '../../../redux/features/infoSlice'; // infoSlice에서 fetchUserInfo 가져오기
import {unwrapResult} from '@reduxjs/toolkit'; // unwrapResult 추가
import {AppDispatch} from '../../../redux/store';
import {fetchMenus} from '../../../redux/features/menuSlice';
type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const SignIn: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {isAuthenticated, token} = useSelector(
    (state: RootState) => state.auth,
  );

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 상태 변경 감지 및 console.log로 토큰 저장 확인
  useEffect(() => {
    console.log('Redux auth 확인:', {isAuthenticated, token});
    if (isAuthenticated) {
      navigation.replace('Home', {}); // 로그인 성공 후 Home으로 이동
    }
  }, [isAuthenticated, token, navigation]);

  const submit = async () => {
    setIsSubmitting(true);
    const loginData = {
      email: form.email,
      password: form.password,
    };
    console.log(loginData);
    try {
      const resultAction = await dispatch(loginUser(loginData));
      unwrapResult(resultAction); // 성공 여부만 확인

      // 로그인 성공 시 fetchUserInfo 호출
      console.log('로그인 성공, 유저 정보 가져오기 시도');
      await dispatch(fetchUserInfo());
      await dispatch(fetchMenus());
    } catch (error) {
      // error가 unknown 타입일 때 처리
      let errorMessage = '로그인에 실패했습니다.';

      if (error instanceof Error) {
        errorMessage = error.message; // 에러가 Error 타입일 경우 message를 가져옴
      } else if (typeof error === 'string') {
        errorMessage = error; // 에러가 string일 경우
      }

      Alert.alert('로그인 실패', errorMessage);
    }

    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>돌아오셨군요! 반가워요</Text>

      <View style={styles.socialContainer}>
        <View style={styles.socialButtonGoogle}>
          <icons.socialGoogle
            style={styles.socialButton}
            width={24}
            height={24}
          />
          <Text style={styles.socialButtonText}>구글로 계속하기</Text>
        </View>
      </View>

      <View style={styles.orContainer}>
        <View style={styles.hairline} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.hairline} />
      </View>

      <View style={styles.formContainer}>
        <FormField
          title="이메일"
          value={form.email}
          handleChangeText={text => setForm({...form, email: text})}
          placeholder="이메일을 입력하세요"
        />
        <FormField
          title="패스워드"
          value={form.password}
          handleChangeText={text => setForm({...form, password: text})}
          placeholder="패스워드를 입력하세요"
          secureTextEntry
        />
      </View>

      <CustomButton
        title="로그인"
        containerStyles="w-[100%] h-[60px]" // Tailwind 스타일 전달
        textStyles="text-white font-pbold" // Tailwind 스타일 전달
        handlePress={submit}
        isLoading={isSubmitting}
      />

      <View style={styles.signupTextContainer}>
        <Text style={styles.text}>아직 회원이 아니신가요?</Text>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>회원가입</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
