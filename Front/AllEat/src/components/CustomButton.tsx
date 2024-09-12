import {TouchableOpacity, Text, GestureResponderEvent} from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: string; // Tailwind 스타일을 문자열로 전달
  textStyles?: string; // Tailwind 스타일을 문자열로 전달
  isLoading?: boolean; // 로딩 상태 여부
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles = '',
  textStyles = '',
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}>
      <Text className={`text-white font-nsemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
