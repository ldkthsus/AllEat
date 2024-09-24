import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/navigation';
import {icons} from '../../../constants';
import {styles} from './PaymoneyDetailScreen.styles'; // 분리된 스타일을 임포트
import api from '../../../utils/api';
import DateSection from '../../../components/DateSection/DateSection';
type PaymoneyDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PaymoneyDetail'
>;
interface Transaction {
  id: number;
  amount: number;
  record: boolean;
  restaurant: {
    id: number;
    restaurantsName: string;
    restaurantsType: string;
  };
  mealpay: any;
  transaction_type: number;
  transaction_date: string;
}
const PaymoneyDetailScreen: React.FC = () => {
  const navigation = useNavigation<PaymoneyDetailScreenNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<{
    [date: string]: Transaction[];
  }>({});

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await api.get('/AllEat/paymoney/balance', {
          params: {
            startDate: '2024-09-18',
            period: 7,
          },
        });
        const rawTransactions = response.data.reverse(); // 데이터를 역순으로

        // 날짜별로 그룹화
        const grouped = groupByDate(rawTransactions);
        setTransactions(grouped);

        setLoading(false);
      } catch (error) {
        // error가 unknown 타입일 때 처리
        let errorMessage = '데이터 가져오는 데에 실패했습니다.';

        if (error instanceof Error) {
          errorMessage = error.message; // 에러가 Error 타입일 경우 message를 가져옴
        } else if (typeof error === 'string') {
          errorMessage = error; // 에러가 string일 경우
        }

        console.error('데이터 가져오기 실패', errorMessage);
      }
    };

    fetchTransactionData();
  }, []);

  // 날짜별로 데이터를 그룹화하는 함수
  const groupByDate = (transactionList: Transaction[]) => {
    return transactionList.reduce((grouped, transaction) => {
      const date = new Date(transaction.transaction_date).toLocaleDateString(
        'ko-KR',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          weekday: 'long', // 요일 표시
        },
      );

      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
      return grouped;
    }, {} as {[date: string]: Transaction[]});
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
        {Object.keys(transactions).map(date => (
          <DateSection
            key={date}
            date={date}
            transactions={transactions[date]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PaymoneyDetailScreen;
