import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  topbar: {
    position: 'absolute', // 고정된 상단 바
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    height: 70, // 높이를 조정
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // 좌우 패딩 조정
  },
  scrollContainer: {
    marginTop: 70, // 상단 바 크기만큼 마진 추가
    flex: 1,
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
  homeDate: {
    position: 'relative',
  },
  calanderBtn: {
    position: 'absolute',
    top: 8,
    left: 67,
  },
  day: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
  },
  mainbox: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EAF0FF',
    alignItems: 'center',
    paddingBottom: 48,
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
  kiki: {
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
    flexWrap: 'wrap',
    width: '100%', // 전체 너비를 사용
    // marginLeft: 90, // 캐릭터 왼쪽 여백
    // marginRight: 180,
    marginTop: 30,
    // backgroundColor: 'pink',
  },
  charInfo: {
    // position: 'absolute',
    flexDirection: 'column',
    left: 0, // 왼쪽에 고정
    top: 0, // 필요한 경우 상단에 위치
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
    flexDirection: 'row', // 가로로 배치
    height: 20, // 게이지 높이 설정
    width: 130,
    borderRadius: 7, // 전체 게이지 바의 둥근 모서리
    backgroundColor: '#EAF0FF', // 배경색 (남는 부분)
    overflow: 'hidden', // 둥근 모서리에서 넘치는 부분 숨김
  },
  gaugeSegment: {
    height: '100%', // 세그먼트가 전체 게이지 높이를 채우도록
  },
  nutrientIcon: {
    marginTop: 5,
    marginRight: 5,
  },
  // 원그래프
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // 원형 프로그레스 바를 나란히 배치
    marginTop: 65,
    width: '100%',
    // backgroundColor: 'black',
  },
  progressWrapper: {
    alignItems: 'center', // 프로그레스 바와 텍스트를 중앙에 배치
    justifyContent: 'center',
  },
  overlayImage: {
    position: 'absolute',
    width: 12, // 원형 그래프 크기와 맞춤
    height: 12,
    zIndex: 2, // 이미지가 원형 그래프 위
  },
  whiteBox: {
    backgroundColor: 'white',
    color: 'white',
    paddingTop: 10,
    // justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  reportBtn: {
    flexDirection: 'row',
    marginLeft: '3%',
  },
  reportBtnText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 19,
  },
  recordBox: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  leftRecord: {
    backgroundColor: 'white',
  },
  rightRecord: {},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  boxContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  box: {
    backgroundColor: '#769BFF',
    borderRadius: 10,
    padding: 5,
  },
  boxText: {color: 'white', fontSize: 18, fontFamily: 'Pretendard-Regular'},
  boxIcon: {position: 'absolute', right: 20},
  titleBox: {
    gap: 10,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBox: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  text: {flexDirection: 'row', width: '50%', gap: 5},
  textTitle: {color: 'white', fontSize: 18, fontFamily: 'Pretendard-Regular'},
  textDiscription: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
  },
  weightBox: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    paddingBottom: 100,
  },
});
