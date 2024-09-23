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
    position: 'absolute',
  },
  kikiShadow: {
    position: 'absolute',
    marginTop: 78,
    marginLeft: 6,
  },
});
