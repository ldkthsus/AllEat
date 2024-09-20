import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import FormField from '../../../components/FormField/FormField';
import CustomButton from '../../../components/CustomButton';
import {styles} from './SignUpScreen.styles';
import {RootStackParamList} from '../../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {icons} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {signupUser} from '../../../redux/auth/authSlice';
import {RootState} from '../../../redux/store';
import {AppDispatch} from '../../../redux/store';
type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const SignUp: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, error, isAuthenticated} = useSelector(
    (state: RootState) => state.auth,
  ); // Redux 상태에서 로그인 여부 확인

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '', // 패스워드 확인용 필드
  });

  // isAuthenticated 상태 변화 감지 후 초기 화면으로 이동
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Initial');
    }
  }, [isAuthenticated, navigation]);

  const handleSubmit = async () => {
    console.log(form);
    // 패스워드 확인 로직
    if (form.password !== form.confirmPassword) {
      Alert.alert('오류', '패스워드가 일치하지 않습니다.');
      return;
    }

    // 백엔드로 보낼 데이터 형식
    const signupData = {
      email: form.email,
      password: form.password,
    };

    try {
      // 회원가입 및 로그인 액션 디스패치
      await dispatch(signupUser(signupData));
    } catch (error) {
      // 에러 처리 (회원가입 실패 시)
      Alert.alert('오류', error?.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.realTitle}>올잇</Text>
        <Text style={styles.title}>과 함께 하시겠어요?</Text>
      </Text>

      <View style={styles.socialContainer}>
        <View style={styles.socialButtonGoogle}>
          <icons.socialGoogle
            style={styles.socialButton}
            width={24}
            height={24}
          />
          <Text style={styles.socialButtonText}>구글로 계속하기</Text>
        </View>
        <View style={styles.socialButtonKakao}>
          <icons.socialKakao
            style={styles.socialButton}
            width={24}
            height={24}
          />
          <Text style={styles.socialButtonText}>카카오로 계속하기</Text>
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
        <FormField
          value={form.confirmPassword}
          handleChangeText={text => setForm({...form, confirmPassword: text})}
          placeholder="패스워드를 다시 입력하세요"
          secureTextEntry
        />
      </View>

      <CustomButton
        title="회원가입"
        containerStyles="w-[100%] h-[60px]" // Tailwind 스타일 전달
        textStyles="text-white font-pbold" // Tailwind 스타일 전달
        handlePress={handleSubmit}
        isLoading={loading} // 로딩 상태 연동
      />

      <View style={styles.loginTextContainer}>
        <Text style={styles.text}>이미 올잇 회원이신가요?</Text>
        <Pressable onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.loginText}>로그인</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
