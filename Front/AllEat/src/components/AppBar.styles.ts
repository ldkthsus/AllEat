import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  textTypo: {
    fontWeight: '300',
    top: '71.93%',
    textAlign: 'left',
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: 14,
    position: 'absolute',
  },

  text: {
    textAlign: 'left',
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: 14,
    position: 'absolute',
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
    height: 100,
    width: '100%',
  },
});
