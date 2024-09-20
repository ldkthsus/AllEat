import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  main: {
    height: '66%',
    position: 'relative',
  },
  discription: {color: '#3D3D3D', fontFamily: 'Pretendard-Regular'},
  title: {
    fontFamily: 'BagelFatOne-Regular',
    color: 'white',
    position: 'absolute',
    fontSize: 100,
    textShadowColor: '#476ed4',
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 20,
  },
});
