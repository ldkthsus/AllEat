import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import CustomButton from '../../../components/CustomButton';
// import {icons} from '../../../constants';
import {styles} from './HomeScreen.styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <CustomButton
        title="계속하기"
        handlePress={() => navigation.navigate('SignIn')}
        containerStyles="w-[80%] h-[60px]" // Tailwind 스타일 전달
        textStyles="text-white font-pbold" // Tailwind 스타일 전달
        isLoading={false} // 로딩 상태 설정
      />
    </View>
  );
};

export default HomeScreen;
