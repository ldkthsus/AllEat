// CircularProgress.tsx
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import {styles} from'./CircularProgress.styles';

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0 to 1 사이의 값
  total: number; // 총 목표 값 (예: 16000원)
  current: number; // 현재 값 (예: 5800원)
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 150,
  strokeWidth = 10,
  progress = 0.36,
  total,
  current,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.svgContainer}>
        <Circle
          stroke="#E0E0E0" // 배경 색
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#769BFF" // 진행된 부분 색
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" // 끝 부분을 둥글게
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <Text style={styles.currentText}>{current}₩</Text>
      <Text style={styles.totalText}>/{total}₩</Text>
    </View>
  );
};

export default CircularProgress;
