import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FormField from '../../components/FormField/FormField';
import CustomButton from '../../components/CustomButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';
import {styles} from './SignInScreen.styles'; // 스타일 임포트
import {icons} from '../../constants';
type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const SignIn: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    setIsSubmitting(true);
    // Perform any form validation or API request here
    navigation.replace('Home');
    setIsSubmitting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>돌아오셨군요! 반가워요</Text>

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
