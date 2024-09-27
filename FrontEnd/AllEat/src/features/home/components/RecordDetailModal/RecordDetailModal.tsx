// RecordDetail.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './RecordDetailModal.styles'; // 스타일 파일
import {icons} from '../../../../constants';
import CustomButton from '../../../../components/CustomButton';
// import api from '../../../../utils/api';
import DiaryCard from '../DiaryCard/DiaryCard';
interface RecordDetailProps {
  date: string;
  title: string;
  kcal: string;
  price: string;
  onClose: () => void;
  onPress: () => void;
}

const RecordDetailModal: React.FC<RecordDetailProps> = ({
  title,
  date,
  kcal,
  price,
  onClose,
  onPress,
}) => {
  const mealList = [
    {restaurant: '집밥', menu: '삶은계란', price: 0, kcal: 78, people: 1},
    {restaurant: '집밥', menu: '삶은계란', price: 0, kcal: 78, people: 1},
  ];
  return (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>
          {date} {title}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <icons.exit height={24} width={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.modalBody}>
        <Text style={styles.modalKcalPrice}>
          {kcal}·{price}
        </Text>
      </View>
      <View style={styles.modalList}>
        {mealList.map((meal, index) => (
          <DiaryCard
            key={index}
            restaurant={meal.restaurant}
            menu={meal.menu}
            price={meal.price}
            kcal={meal.kcal}
            people={meal.people}
            isEdit={false}
          />
        ))}
        <CustomButton
          title="수정하기"
          handlePress={onPress}
          containerStyles="w-[88%] h-[60px]  mb-5 bg-white" // Tailwind 스타일 전달
          textStyles="text-secondary font-pbold" // Tailwind 스타일 전달
          isLoading={false} // 로딩 상태 설정
        />
      </View>
    </View>
  );
};

export default RecordDetailModal;
