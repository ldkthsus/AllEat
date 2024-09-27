import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  recordContainer: {
    width: 150,
    height: 110,
    position: 'relative', // 텍스트와 아이콘을 배치할 수 있도록 설정
  },
  overlay: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  priceText: {
    position: 'absolute',
    top: 46,
    right: 10,
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: '#FFF',
    marginTop: 40,
  },
  kcal: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
    fontFamily: 'Pretendard-SemiBold',
  },
  iconWrapper: {
    position: 'absolute',
    top: 56,
    right: 10,
    // backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 5,
  },
});
