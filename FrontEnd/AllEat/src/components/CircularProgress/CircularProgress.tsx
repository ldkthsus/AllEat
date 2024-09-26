import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { styles } from './CircularProgress.styles';

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0 to 1 사이의 값
  total: number; // 총 목표 값 (예: 16000원)
  current: number; // 현재 값 (예: 5800원)
  progressColor?: string; // 프로그레스 바 색상
  currentTextColor?: string; // 현재 텍스트 색상
  totalTextColor?: string; // 총 텍스트 색상
  unit?: string; // 단위 (₩, kcal 등)
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 120,
  strokeWidth = 10,
  progress = 0.36,
  total,
  current,
  progressColor = '#769BFF',//기본 색상
  currentTextColor = '#769BFF', // 기본 현재 텍스트 색상
  totalTextColor = 'black', // 기본 총 텍스트 색상
  unit = '₩', // 기본 단위는 '₩'로 설정
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const angle = progress * 2 * Math.PI;

  const x = center + radius * Math.sin(angle);
  const y = center - radius * Math.cos(angle);

  const largeArcFlag = progress > 0.5 ? 1 : 0;

  const pathData = `
    M ${center} ${center - radius}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y}
    L ${center} ${center}
    Z
  `;

  return (
    <View style={styles.circleContainer}>
      <Svg width={size} height={size} style={styles.svgContainer}>
        {/* 안이 채워진 배경 원 */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="#E0E0E0" // 채워진 배경 색
        />
        {/* 진행된 부분 (피자 형태) */}
        <Path
          d={pathData}
          fill={progressColor} // 진행된 부분 색
        />
      </Svg>
      <Text style={[styles.currentText, { color: currentTextColor }]}>
        {current}{unit}
      </Text>
      {/* 총 값 텍스트 */}
      <Text style={[styles.totalText, { color: totalTextColor }]}>
        /{total}{unit}
      </Text>
    </View>
  );
};

export default CircularProgress;
