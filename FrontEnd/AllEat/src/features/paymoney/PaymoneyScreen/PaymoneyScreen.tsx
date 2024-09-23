import React from 'react';
import {Text, View} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {images} from '../../../constants';
import {styles} from './PaymoneyScreen.styles';
import LinkButton from '../../../components/linkButton';

type PaymoneyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Paymoney'
>;

const PaymoneyScreen: React.FC = () => {
  const navigation = useNavigation<PaymoneyScreenNavigationProp>();

  return (
    <LinearGradient style={[styles.gradientBackground]} locations={[0,1]} colors={['#769bff','#b7caff']} useAngle={true} angle={257.3}>
      <View style={styles.bodyContainer}>
        <Text style={styles.payTitle}>AllEat Pay</Text>
        {/* 페이머니 잔액 데이터 */}
        <Text style={styles.amountText}>880,000원</Text>
        <View style={styles.useAmountBox}>
          {/* 페이머니 사용 금액 데이터 */}
          <Text style={styles.usedAmonutText}>사용 금액 : 171,711원</Text>
        </View>
        <View style={styles.inoutContainer}>
          <View style={styles.inoutBox}>
            {/* 충전 api 요청 */}
            <Text style={styles.inoutText}>충전</Text>
          </View>
          <View style={styles.inoutBox}>
            {/* 송금 api 요청 */}
            <Text style={styles.inoutText}>송금</Text>
          </View>
        </View>
        <View style={styles.QRcodeContainer}>
          <images.QRCode height={90} width={90}/>
        </View>
        <View style={styles.payCardContainer}>
          <View style={styles.greyCookieWrapper}>
            <images.greyCookie height={100} width={100} />
          </View>
          <View style={styles.payCardWrapper}>
            <images.payCardWhite height={160}/>
          </View>
        </View>
        <View style={styles.linkButtonContainer}>
        <LinkButton
          text="결제 내역 확인하기"
          targetScreen="Home" />
        </View>
      </View>
    </LinearGradient>
  );
};
export default PaymoneyScreen;
