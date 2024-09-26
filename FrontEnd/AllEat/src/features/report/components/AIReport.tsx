import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { icons } from '../../../constants';

// AIReport 컴포넌트의 props 타입 정의
interface AIReportProps {
  title: string,
  aiData: string
}

const AIReport: React.FC<AIReportProps> = ({ title, aiData }) => {
  return (
    <View style={styles.AIContainer}>
      <icons.mypage style={styles.AIIcon} width={30} height={30} />
      {/* AI 데이터 요약 영역 */}
      <View>
        <Text style={styles.AITitleText}>{title}</Text>
        <Text style={styles.AIText}>
          {aiData}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  AIContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    position: 'relative',
    padding: 20,
  },
  AIIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  AITitleText: {
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 17,
    color: 'black',
  },
  AIText: {
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: 'Pretendard-Light',
    fontSize: 14,
    color: 'black',
  },
});

export default AIReport;
