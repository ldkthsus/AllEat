import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const WeeklyReport: React.FC = () => {

  return (
    <View>
      <Text>주간 레포트 영역</Text>
    </View>
  );
};


export default WeeklyReport;

