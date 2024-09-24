import React from 'react';
import {View, Text} from 'react-native';
import {icons} from '../../constants';
import {styles} from './DateSection.styles';
import TransactionItem from '../TransactionItem/TransactionItem'; // 아래에서 정의할 TransactionItem 컴포넌트

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

interface DateSectionProps {
  date: string;
  transactions: Transaction[];
}

const DateSection: React.FC<DateSectionProps> = ({date, transactions}) => {
  return (
    <View style={styles.dateSection}>
      <icons.passwordCheck width={24} height={24} style={styles.dateIcon} />
      <Text style={styles.dateText}>{date}</Text>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </View>
  );
};

export default DateSection;
