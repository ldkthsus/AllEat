import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {icons} from '../../../constants';
import {images} from '../../../constants';
import {styles} from './PaymoneyDetailScreen.styles'; // 분리된 스타일을 임포트
import CustomButton from '../../../components/CustomButton';
type PaymoneyDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymoneyDetail'
>;
const PaymoneyDetailScreen: React.FC = () => {
  const navigation = useNavigation<PaymoneyDetailScreenNavigationProp>();

  return (
    <View style={styles.body}>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>결제 내역</Text>
        <TouchableOpacity
          style={styles.topIcon}
          onPress={() => navigation.navigate('Paymoney')}>
          <icons.arrowBackLeft height={24} width={24} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        
      </ScrollView>
    </View>
  );
};
export default PaymoneyDetailScreen;
