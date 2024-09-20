import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FormField from '../../../components/FormField/FormField'; 
import CustomButton from '../../../components/CustomButton';
import { styles } from './SignInScreen.styles';
import { RootStackParamList } from '../../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { icons } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/auth/authSlice'; 
import { RootState } from '../../../redux/store';

type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const SignIn: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 상태 변경 감지 및 console.log로 토큰 저장 확인
  useEffect(() => {
    console.log('Redux auth 확인:', { isAuthenticated, token });
    if (isAuthenticated) {
      navigation.replace('Home');  // 로그인 성공 후 Home으로 이동
    }
  }, [isAuthenticated, token, navigation]);

  const submit = async () => {
    setIsSubmitting(true);

    const loginData = {
      email: form.email,
      password: form.password,
    };

    try {
      await dispatch(loginUser(loginData));
    } catch (error) {
      Alert.alert('로그인 실패', error?.message || '로그인에 실패했습니다.');
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
          handleChangeText={text => setForm({ ...form, email: text })}
          placeholder="이메일을 입력하세요"
        />
        <FormField
          title="패스워드"
          value={form.password}
          handleChangeText={text => setForm({ ...form, password: text })}
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
