// RecordDetail.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './RecordDetailModal.styles'; // 스타일 파일

interface RecordDetailProps {
  title: string;
  kcal: string;
  price: string;
  onClose: () => void;
}

const RecordDetailModal: React.FC<RecordDetailProps> = ({
  title,
  kcal,
  price,
  onClose,
}) => {
  return (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{title} 기록 상세</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeButton}>닫기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.modalBody}>
        <Text>칼로리: {kcal}</Text>
        <Text>가격: {price}</Text>
        {/* 추가적인 내용들 */}
      </View>
    </View>
  );
};

export default RecordDetailModal;
