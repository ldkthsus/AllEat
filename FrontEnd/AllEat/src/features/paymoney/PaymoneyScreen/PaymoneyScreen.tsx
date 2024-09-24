import React, {useState} from 'react';
import {Text, View, Pressable} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {images} from '../../../constants';
import {styles} from './PaymoneyScreen.styles';
import LinkButton from '../../../components/linkButton';
import InoutModal from './components/InoutModal';

type PaymoneyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Paymoney'
>;

const PaymoneyScreen: React.FC = () => {
  const navigation = useNavigation<PaymoneyScreenNavigationProp>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [placeholderText, setPlaceholderText] = useState<string>(''); 
  const [guideText, setGuideText] = useState<string>(''); 
  const [rechargeAmount, setRechargeAmount] = useState<number | null>(null); // 충전 금액

  const handleConfirm = (amount: number) => {
    setRechargeAmount(amount);
    console.log(`금액: ${amount}`); // 추후 API 요청 시 사용
  };

  const openRechargeModal = () => {
    setPlaceholderText('충전 금액을 입력해 주세요');
    setGuideText('얼마를 충전할까요?');
    setModalVisible(true);
  };

  const openTransferModal = () => {
    setPlaceholderText('송금 금액을 입력해 주세요');
    setGuideText('얼마를 송금할까요?');
    setModalVisible(true);
  };

  return (
    <LinearGradient style={[styles.gradientBackground]} locations={[0,1]} colors={['#769bff','#b7caff']} useAngle={true} angle={257.3}>
      <View style={styles.bodyContainer}>
        <Text style={styles.payTitle}>AllEat Pay</Text>
        <Text style={styles.amountText}>880,000원</Text>
        <View style={styles.useAmountBox}>
          <Text style={styles.usedAmonutText}>사용 금액 : 171,711원</Text>
        </View>
        <View style={styles.inoutContainer}>
          {/* 충전 박스 */}
          <Pressable style={styles.inBox} onPress={openRechargeModal}>
            <Text style={styles.inoutText}>충전</Text>
          </Pressable>
          <Pressable style={styles.outBox} onPress={openTransferModal}>
            <Text style={styles.inoutText}>송금</Text>
          </Pressable>
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
          <LinkButton text="결제 내역 확인하기" targetScreen="Home" />
        </View>

        {/* InoutModal 추가 */}
        <InoutModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleConfirm}
          placeholderText={placeholderText}
          guideText={guideText}
        />
      </View>
    </LinearGradient>
  );
};

export default PaymoneyScreen;
