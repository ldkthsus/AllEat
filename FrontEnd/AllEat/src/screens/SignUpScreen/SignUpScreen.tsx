import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import FormField from '../../components/FormField/FormField'; // 기존에 만든 form 컴포넌트 사용
import CustomButton from '../../components/CustomButton'; // 버튼 컴포넌트 사용
import {styles} from './SignUpScreen.styles'; // 스타일 파일 임포트
import {RootStackParamList} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {icons} from '../../constants';
type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const SignUp: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // 회원가입 로직
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.text1}>올잇</Text>
        <Text style={styles.text2}>과 함께 하시겠어요?</Text>
      </Text>

      <View style={styles.socialContainer}>
        <View style={styles.socialButton}>
          <icons.socialGoogle width={24} height={24} />
          <Text style={styles.socialButtonText}>구글로 계속하기</Text>
        </View>
        <View style={styles.socialButton}>
          <icons.socialKakao width={24} height={24} />
          <Text style={styles.socialButtonText}>카카오로 계속하기</Text>
        </View>
      </View>

      <Text style={styles.orText}>or</Text>

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
          title="패스워드 확인"
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
        isLoading={isSubmitting}
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
