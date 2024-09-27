import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  recordContainer: {
    width: 150,
    height: 150,
    position: 'relative',  // 텍스트와 아이콘을 배치할 수 있도록 설정
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 10, 
  },
  priceText: {
    position: 'absolute',
    top: 5,
    right: 10,
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 40,
  },
  kcal: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
  iconWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 5,
  },
});
