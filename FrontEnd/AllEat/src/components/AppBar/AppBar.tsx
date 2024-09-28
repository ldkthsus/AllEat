import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {styles} from './AppBar.styles'; // 스타일 파일 임포트
import {icons} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation'; // RootStackParamList를 가져옵니다

type AppBarNavigationProp = NativeStackNavigationProp<RootStackParamList>;
const AppBar: React.FC = () => {
  const navigation = useNavigation<AppBarNavigationProp>();
  return (
    <View style={styles.appBar}>
      <Pressable
        style={styles.icon}
        onPress={() => navigation.navigate('Home', {})}>
        <icons.home height={30} width={30} />
        <Text style={styles.text}>홈</Text>
      </Pressable>

      <Pressable
        style={styles.icon}
        onPress={() => navigation.navigate('Paymoney')}>
        <icons.pay height={30} width={30} />
        <Text style={styles.text}>페이머니</Text>
      </Pressable>

      <Pressable style={styles.icon} onPress={() => {}}>
        <icons.log height={30} width={30} />
        <Text style={styles.text}>로그</Text>
      </Pressable>

      <Pressable
        style={styles.icon}
        onPress={() => navigation.navigate('MyPage')}>
        <icons.mypage height={30} width={30} />
        <Text style={styles.text}>마이 페이지</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
