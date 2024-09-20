import React from 'react';
import {View,  Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {icons} from '../../../constants';
import {styles} from './HomeScreen.styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.topbar} >
      <icons.arrowBackLeft style={styles.arrowBackLeft} height={30} width={30} />
      <Text style={styles.day}>오늘</Text>
      <icons.notifications style={styles.notificationIcon} height={20} width={20}/>
      <icons.notiBadge style={styles.notiBadge} height={10} width={10} />
      <icons.arrowBackRight style={styles.arrowBackRight} height={30} width={30} /> 
    </View>
  );
};

export default HomeScreen;
