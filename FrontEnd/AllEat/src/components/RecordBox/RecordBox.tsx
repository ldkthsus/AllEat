import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './RecordBox.styles';
import { images, icons } from '../../constants';

type RecordBoxProps = {
  title: string;  // 예: '아침'
  kcal: string;   // 예: '330.2kcal'
  price: string;  // 예: '5000₩'
};

const RecordBox: React.FC<RecordBoxProps> = ({ title, kcal, price }) => {
  return (
    <View style={styles.recordContainer}>
      <images.recordBox height={150} width={150} />
      <View style={styles.overlay}>
        <Text style={styles.priceText}>{price}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.kcal}>{kcal}</Text>
        <View style={styles.iconWrapper}>
          <icons.plusWhite height={20} width={20} />
        </View>
      </View>
    </View>
  );
};

export default RecordBox;
