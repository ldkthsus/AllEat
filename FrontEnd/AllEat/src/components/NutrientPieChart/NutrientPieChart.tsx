// NutrientPieChart.tsx
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import { images } from '../../constants'; // 이미지 경로를 제대로 설정해 주세요.

interface NutrientPieChartProps {
  carbPercentage: number;
  proteinPercentage: number;
  fatPercentage: number;
  size?: number;
}

const NutrientPieChart: React.FC<NutrientPieChartProps> = ({
  carbPercentage,
  proteinPercentage,
  fatPercentage,
  size = 160,
}) => {
  const radius = size / 2;
  const center = size / 2;
  
  // 각 영양소의 각도 계산
  const carbAngle = (carbPercentage / 100) * 360;
  const proteinAngle = (proteinPercentage / 100) * 360;
  const fatAngle = (fatPercentage / 100) * 360;

  // 원의 전체 각도 중 각 부분의 끝 각도를 누적
  const angles = [
    { startAngle: 0, endAngle: carbAngle, color: '#B0C5FF', label: '탄수화물', percentage: carbPercentage.toFixed(1) },
    { startAngle: carbAngle, endAngle: carbAngle + proteinAngle, color: '#769BFF', label: '단백질', percentage: proteinPercentage.toFixed(1) },
    { startAngle: carbAngle + proteinAngle, endAngle: carbAngle + proteinAngle + fatAngle, color: '#D3DFFF', label: '지방', percentage: fatPercentage.toFixed(1) },
  ];

  // 각 영역의 Path를 생성하는 함수
  const createPieSlicePath = (startAngle: number, endAngle: number) => {
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    return `M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  };

  // 각도를 좌표로 변환하는 함수
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // 파이 조각 중심에 텍스트 위치를 계산하는 함수
  const calculateTextPosition = (startAngle: number, endAngle: number) => {
    const midAngle = (startAngle + endAngle) / 2;
    return polarToCartesian(center, center, radius * 0.6, midAngle); // 0.6을 곱하여 파이의 내부에 위치하도록 조정
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* Pie Chart 영역 */}
      <Svg style={styles.kcalPieChart} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 각 영양소 영역 그리기 */}
        {angles.map((slice, index) => (
          <React.Fragment key={index}>
            <Path d={createPieSlicePath(slice.startAngle, slice.endAngle)} fill={slice.color} />
            <SvgText
              x={calculateTextPosition(slice.startAngle, slice.endAngle).x}
              y={calculateTextPosition(slice.startAngle, slice.endAngle).y}
              fill="#000"
              fontFamily='Pretendard-Regular'
              fontSize="13"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {`${slice.percentage}%`}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>

      {/* 그래프 위에 이미지를 위치시키기 */}
      <images.excludeWhite
        width={size*1.1} height={size*1.1}
        style={[styles.excludeWhite,]}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  kcalPieChart: {
    position: 'relative',
  },
  excludeWhite: {
    position: 'absolute',
  },
});

export default NutrientPieChart;
