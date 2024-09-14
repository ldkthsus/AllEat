import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {icons} from '../../../constants';
import {images} from '../../../constants';
import {styles} from './InitialScreen.styles'; // 분리된 스타일을 임포트
import CustomButton from '../../../components/CustomButton';
import FormField from '../../../components/FormField/FormField';
import {useState} from 'react';
type InitialScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Initial'
>;
const InitialScreen: React.FC = () => {
  const navigation = useNavigation<InitialScreenNavigationProp>();
  const [form, setForm] = useState({
    nickname: '',
    age: '',
    height: '',
    currentWeight: '',
    targetWeight: '',
  });
  const [selectedGender, setSelectedGender] = useState<'woman' | 'man'>(
    'woman',
  );
  const [selectedActiveRange, setSelectedActiveRange] = useState<
    'normal' | 'notActive' | 'active'
  >('normal');
  return (
    <ScrollView>
      <View style={styles.body}>
        <Text style={styles.title}>추가 정보를 입력해주세요!</Text>
        <FormField
          title="닉네임"
          value={form.nickname}
          handleChangeText={text => setForm({...form, nickname: text})}
          placeholder="키키"
        />
        <FormField
          title="나이"
          value={form.age}
          unit="세"
          handleChangeText={text => setForm({...form, age: text})}
          otherStyles={styles.field}
        />
        <FormField
          title="키"
          value={form.height}
          unit="cm"
          handleChangeText={text => setForm({...form, height: text})}
          otherStyles={styles.field}
        />
        <FormField
          title="현재 몸무게"
          value={form.currentWeight}
          unit="kg"
          handleChangeText={text => setForm({...form, currentWeight: text})}
          otherStyles={styles.field}
        />
        <FormField
          title="목표 몸무게"
          value={form.targetWeight}
          unit="kg"
          handleChangeText={text => setForm({...form, targetWeight: text})}
          otherStyles={styles.field}
        />
        <View style={styles.form}>
          <Text style={styles.formLabel}>성별</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setSelectedGender('woman')}>
            {selectedGender === 'woman' ? (
              <icons.woman width={80} height={80} />
            ) : (
              <icons.womanDisabled width={80} height={80} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setSelectedGender('man')}>
            {selectedGender === 'man' ? (
              <icons.man width={70} height={70} />
            ) : (
              <icons.manDisabled width={70} height={70} />
            )}
          </TouchableOpacity>
          <Text>여성</Text>
          <Text>남성</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.formLabel}>활동량</Text>
          <TouchableOpacity
            style={styles.image}
            onPress={() => setSelectedActiveRange('notActive')}>
            {selectedActiveRange === 'notActive' ? (
              <images.notActive width={80} height={80} />
            ) : (
              <images.notActiveDisabled width={80} height={80} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.image}
            onPress={() => setSelectedActiveRange('normal')}>
            {selectedActiveRange === 'normal' ? (
              <images.normalActive width={80} height={80} />
            ) : (
              <images.normalActiveDisabled width={80} height={80} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.image}
            onPress={() => setSelectedActiveRange('active')}>
            {selectedActiveRange === 'active' ? (
              <images.veryActive width={90} height={90} />
            ) : (
              <images.veryActiveDisabled width={90} height={90} />
            )}
          </TouchableOpacity>
          <Text>적음</Text>
          <Text>보통</Text>
          <Text>많음</Text>
        </View>

        <CustomButton
          title="계속하기"
          handlePress={() => navigation.navigate('Home')}
          containerStyles="w-[100%] h-[60px]" // Tailwind 스타일 전달
          textStyles="text-white font-pbold" // Tailwind 스타일 전달
          isLoading={false} // 로딩 상태 설정
        />
      </View>
    </ScrollView>
  );
};
export default InitialScreen;
