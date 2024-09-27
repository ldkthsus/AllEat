import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    width: '88%',
    margin: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 20,

    color: '#3d3d3d',
    fontFamily: 'Pretendard-SemiBold',
  },
  modalBody: {width: '88%', margin: 10},
  modalKcalPrice: {
    fontSize: 20,
    color: '#93AAE7',
    fontFamily: 'Pretendard-Bold',
  },
  modalList: {
    width: '100%',
    backgroundColor: '#93AAE7',
    alignItems: 'center',
    paddingTop: 10,
    gap: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
