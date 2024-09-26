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
    width: '94%',
    paddingVertical: 16,
    paddingBottom: 28,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    // gap: 5,
    display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  modalTitle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitleText: {
    fontSize: 18,

    color: '#3d3d3d',
    fontFamily: 'Pretendard-Bold',
  },
  modalIcon: {},
  addMenu: {flexDirection: 'row'},
  addMenuContainer: {
    backgroundColor: '#EAF0FF',
    width: '44%',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addMenuImage: {width: 100, height: 100},
  addMenuContainerText: {
    fontSize: 16,
    color: '#3d3d3d',
    fontFamily: 'Pretendard-Bold',
  },
  field: {width: '48%'},
  menuFormContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  homeMade: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  nutrientFormBox: {width: '44%'},
  nutrientForm: {height: 36, marginBottom: 3, fontSize: 14, paddingBottom: 5},
  nutrientFormTitle: {
    fontSize: 14,
    color: '#3d3d3d',
    fontFamily: 'Pretendard-Bold',
  },
  nutrientFormContainer: {flexDirection: 'row', gap: 5},
  nutrientFormCard: {gap: 3},
});
