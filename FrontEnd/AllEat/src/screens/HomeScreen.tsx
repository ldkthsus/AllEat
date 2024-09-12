import React from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import CustomButton from '../components/CustomButton';
import {icons} from '../constants';
import AppBar from '../components/AppBar/AppBar';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View className="flex-1 bg-white p-4">
      <AppBar />
    </View>
  );
};

export default HomeScreen;
