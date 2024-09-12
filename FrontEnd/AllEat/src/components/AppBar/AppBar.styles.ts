import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  text: {
    color: '#3d3d3d',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    position: 'absolute',
    top: 36,
  },
  icon: {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
  },
  appBar: {
    shadowColor: 'rgba(127, 127, 127, 0.2)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowOpacity: 1,
    backgroundColor: '#fff',
    flex: 1,
    height: 10,
    width: '100%',
  },
});
