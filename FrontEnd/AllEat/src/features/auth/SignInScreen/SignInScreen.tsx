import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import FormField from '../../../components/FormField/FormField';
import CustomButton from '../../../components/CustomButton';
import {styles} from './SignInScreen.styles';
import {RootStackParamList} from '../../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {KakaoOAuthToken, login as kakaoLogin, getProfile as getKakaoProfile} from '@react-native-seoul/kakao-login'; // 카카오 로그인 관련 패키지
import {icons} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../redux/features/authSlice';
import {RootState} from '../../../redux/store';
import {fetchUserInfo} from '../../../redux/features/infoSlice'; // infoSlice에서 fetchUserInfo 가져오기
import {unwrapResult} from '@reduxjs/toolkit'; // unwrapResult 추가
import {AppDispatch} from '../../../redux/store';

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
      navigation.replace('Home'); // 로그인 성공 후 Home으로 이동
    }
  }, [isAuthenticated, token, navigation]);

// 카카오 로그인 처리 함수
const handleKakaoSignIn = async () => {
  try {
    console.log("카카오 로그인 시도");

    // 카카오 로그인 시도
    const token: KakaoOAuthToken = await kakaoLogin();
    console.log('카카오 로그인 토큰:', token);

    if (!token) {
      console.error('카카오 로그인 토큰이 존재하지 않습니다.');
      return;
    }

    // 카카오 사용자 정보 가져오기
    const profile = await getKakaoProfile();
    console.log('카카오 사용자 정보:', profile);

    if (!profile) {
      console.error('카카오 프로필 정보를 가져오지 못했습니다.');
      return;
    }

    // 서버로 토큰을 보내 인증 처리하기 위해 redux 상태 업데이트 또는 API 요청
    await dispatch(
      loginUser({
        email: profile.email, // 백엔드에 전달할 수 있도록 필요한 필드로 수정하세요
        password: '', // 소셜 로그인에는 password 필드가 필요하지 않을 수 있습니다.
        token: token.accessToken, // 인증 토큰 전달
      }),
    );
  } catch (error) {
    console.error('카카오 로그인 실패:', error);
    Alert.alert('로그인 실패', '카카오 로그인 중 오류가 발생했습니다.');
  }
};

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
        <Pressable style={styles.socialButtonKakao} onPress={handleKakaoSignIn}>
          <icons.socialKakao
            style={styles.socialButton}
            width={24}
            height={24}
          />
          <Text style={styles.socialButtonText}>카카오로 계속하기</Text>
        </Pressable>
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
