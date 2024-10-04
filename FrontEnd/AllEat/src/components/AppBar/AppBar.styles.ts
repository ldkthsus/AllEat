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
    shadowColor: 'black', // iOS 그림자 색상
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4, // iOS 그림자 반경
    elevation: 15, // Android 그림자 높이
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 15,
    paddingTop: 10,
  },
  circle: {
    position: 'absolute',
    width: 105,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 100, // 완전한 원형으로 만들기
    bottom: -7,
    left: -8,
    zIndex: -2, // 아이콘 아래에 위치
    elevation: 10, // 안드로이드에서 그림자 높이
    shadowColor: '#000000', // 그림자 색상 (iOS에서도 사용 가능)
    shadowOffset: { width: 0, height: 4 }, // 그림자 위치
  },
});
