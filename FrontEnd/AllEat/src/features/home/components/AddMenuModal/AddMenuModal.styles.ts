import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  searchBox: {
    height: '300%',
    top: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 3,
  },
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
});
