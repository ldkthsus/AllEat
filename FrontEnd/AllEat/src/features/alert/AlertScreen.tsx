import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import { icons } from '../../constants';
import { styles } from './AlertScreen.styles';

type AlertScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AlertScreen'
>;

const AlertScreen: React.FC = () => {

  const navigation = useNavigation<AlertScreenNavigationProp>();

  return (
    <View style={styles.body}>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>나의 알림</Text>
        <TouchableOpacity
          style={styles.topIcon}
          onPress={() => navigation.navigate('Home')}>
          <icons.arrowBackLeft height={24} width={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        {/* 알림 컨테이너 */}
        <View style={styles.alertContainer}>
          <icons.mypage width={20} height={20} />
          {/* 알림 내용 */}
          <View style={styles.alertTextConatiner}>
            <Text style={styles.alertText}>아직 식단을 기록하지 않은 결제 내역이 있어요!</Text>
            {/* 알림 시간 */}
            <Text style={styles.alertTimeText}>1시간 전</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AlertScreen;
