import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svgContainer: {
    position: 'absolute',
  },
  currentText: {
    fontSize: 20,
    color: '#769BFF',
    fontFamily: 'Pretendard-SemiBold',
    zIndex: 1000,
  },
  totalText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Pretendard-Light',
    zIndex: 1000,
  },
});
