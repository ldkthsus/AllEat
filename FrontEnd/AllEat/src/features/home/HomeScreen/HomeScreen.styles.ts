import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  topbar: {
    position: 'relative',
    backgroundColor: 'white',
    width: '100%',
    height: '8.3%',
    flexDirection: 'row',  // 좌우로 아이콘을 배치
    alignItems: 'center',  // 아이콘을 세로로 중앙 정렬
    justifyContent: 'space-between', // 좌우에 아이콘을 배치

  },
  notificationIcon: {
    position: 'absolute',
    flex: 1,
    height: '35.8%',
    width: '6.94%',
    top: '30.91%',
    right: '10.83%',
    bottom: '32.3%',
    left: '82.22%',
  },
  notiBadge: {
    position: 'absolute',
    height: '35.8%',
    width: '6.94%',
    top: '30.91%',
    right: '10.83%',
    bottom: '32.3%',
    left: '85.22%',
    zIndex: 1000,
  },
  arrowBackRight: {
    // position: 'absolute',
  },
  arrowBackLeft: {
    // position: 'absolute',
  },
  day: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
  },
  mainbox: {
    flex: 1,
    width: '100%',
    height: '20.3%',
    backgroundColor: '#EAF0FF',
    alignItems: 'center',
  },
  allText: {
    flexDirection: 'row',
  },
  eatpay: {
    fontSize: 15,
    fontFamily: 'Pretendard-Light',
    marginTop: 10,

  },
  eatpayValue: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: '#769BFF',
    marginTop: 10,
  },
  re_checkIcon: {
    marginTop: 13,
  },
  kiki:{
    // position: 'absolute',
  },
  kikiShadow: { 
    position: 'absolute',
    marginTop: 75,
    marginLeft: 18,
  },
  kikiBox: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap:'wrap',
    width: '100%', // 전체 너비를 사용
    // marginLeft: 90, // 캐릭터 왼쪽 여백
    // marginRight: 180,
    marginTop: 30,
    backgroundColor: 'pink',
  },
  charInfo: {
    // position: 'absolute',
    flexDirection: 'column',
    left: 0,  // 왼쪽에 고정
    top: 0,  // 필요한 경우 상단에 위치
    marginLeft: 30,
  },
  // 게이지 새로 추가
  nutrientInfo: {
    // position: 'absolute',
    flexDirection: 'column',
    right: 0,
    top: 0,
    marginRight: 30,
  },
  nutrientText: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 8,
  },
  nutrientCarb: {
    color: '#769BFF',
    fontFamily: 'Pretendard-Medium',
  },
  nutrientProtein: {
    color: '#4D7CFE',
    fontFamily: 'Pretendard-Medium',
  },
  nutrientFat: {
    color: '#A0BFFF',
    fontFamily: 'Pretendard-Medium',
  },
  gaugeBox: {
    flexDirection: 'row',  // 가로로 배치
    height: 20,  // 게이지 높이 설정
    width: 130,
    borderRadius: 0,  // 전체 게이지 바의 둥근 모서리
    backgroundColor: '#EAF0FF',  // 배경색 (남는 부분)
    overflow: 'hidden',  // 둥근 모서리에서 넘치는 부분 숨김
  },
  gaugeSegment: {
    height: '100%',  // 세그먼트가 전체 게이지 높이를 채우도록
  },
  nutrientIcon: {
    marginTop: 5,
    marginRight: 5,
  },
// 원그래프
progressContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',  // 원형 프로그레스 바를 나란히 배치
  marginTop: 20,
  width: '100%',
},
progressWrapper: {
  alignItems: 'center',  // 프로그레스 바와 텍스트를 중앙에 배치
  justifyContent: 'center',
},
});
