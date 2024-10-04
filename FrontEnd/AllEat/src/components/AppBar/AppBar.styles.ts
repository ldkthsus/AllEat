import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative', // 부모 컨테이너를 상대적으로 배치하여 zIndex가 작동하도록 설정
  },
  text: {
    color: '#3d3d3d',
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    marginTop: 3,
    textAlign: 'center',
  },
  icon: {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2, // 아이콘이 원형 위에 있도록 zIndex 조정
  },
  appBar: {
    zIndex: 2, // appBar를 아이콘들 위에 배치
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
    backgroundColor: 'white',
    borderRadius: 100, // 완전한 원형으로 만들기
    bottom: -11,
    left: -7,
    zIndex: -1, // 원형이 아이콘과 appBar 뒤에 위치
    // elevation 제거: 안드로이드에서 원형이 위로 올라오는 문제 해결
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: -4}, // 그림자 위치
    shadowOpacity: 0.25, // 그림자 불투명도
    shadowRadius: 10, // 그림자 반경 (흐림 효과)
  },
});
