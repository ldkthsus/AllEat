import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  diaryBody: {backgroundColor: 'white', height: '100%'},
  topbar: {
    shadowColor: 'black', // iOS 그림자 색상
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1, // iOS 그림자 반경
    elevation: 5, // Android 그림자 높이
    backgroundColor: 'white',
    width: '100%',
    height: '8.3%',
    flexDirection: 'row', // 좌우로 아이콘을 배치
    alignItems: 'center', // 아이콘을 세로로 중앙 정렬
    justifyContent: 'space-between', // 좌우에 아이콘을 배치
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
  },
  main: {height: '40%'},
  mainTitle: {
    color: 'black',
    margin: 10,
    marginTop: 24,
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
  mainRecord: {
    backgroundColor: '#93AAE7',
    padding: 10,
    justifyContent: 'center',
    maxHeight: '66%',
  },
  recordIconContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  recordIcon: {position: 'absolute', top: -21},
  mainRecordCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 5,
  },
  mainRecordMenu: {width: '45%'},
  cardDescription: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
  },
  mainRecordPeople: {alignItems: 'center'},
  mainRecordPeopleButton: {alignItems: 'center', flexDirection: 'row'},
  restaurant: {height: '31%'},
  restaurantTitle: {flexDirection: 'row', justifyContent: 'space-between'},
  restaurantTitleText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
  restaurantMenuContainer: {marginHorizontal: 10, gap: 10, marginVertical: 24},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  buttonTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    width: '60%',
  },
  buttonTitle: {color: '#3d3d3d', fontSize: 24, fontFamily: 'Pretendard-Bold'},
  buttonCost: {color: '#3d3d3d', fontSize: 20, fontFamily: 'Pretendard-Bold'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});
