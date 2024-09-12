import React from 'react';
import {View, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import CustomButton from '../components/CustomButton';
import {icons} from '../constants';
import AppBar from '../components/AppBar';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface TabIconProps {
  icon: any;
  color?: string;
  name: string;
  focused?: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        style={{width: 24, height: 24, tintColor: color}}
      />
      <Text
        className={`${focused ? 'font-nsemibold' : 'font-regular'}`}
        style={{color: color}}>
        {name}
      </Text>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View className="flex-1 bg-white p-4">
      <AppBar />
    </View>
  );
};

export default HomeScreen;
