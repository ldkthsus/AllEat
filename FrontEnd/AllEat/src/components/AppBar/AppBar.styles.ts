import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  text: {
    color: '#3d3d3d',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    marginTop: 3,
  },
  icon: {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2, // 아이콘이 원형 위에 있도록 zIndex 조정
  },
  appBar: {
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 15,
    paddingTop: 10,
  },
  circle: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 100, // 완전한 원형으로 만들기
    bottom: -11,
    left: -7,
    zIndex: -2, // 아이콘 아래에 위치
    elevation: 12, // 안드로이드에서 그림자 높이
    shadowColor: '#000000', // 그림자 색상 (iOS에서도 사용 가능)
    shadowOffset: { width: 0, height: 4 }, // 그림자 위치
  },
});
