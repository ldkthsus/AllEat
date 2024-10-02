import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'white',
    height: 60,
  },
  topText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#3d3d3d',
  },
  topIcon: {position: 'absolute', left: 20},
  bodyContainer: {
    padding: 20
  },
  alertContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  alertTextConatiner: {
    display: 'flex',
  },
  alertText: {
    paddingStart: 10,
    paddingBottom: 2,
    fontFamily: 'Pretendard-Regular',
    fontSize: 15,
    letterSpacing: -0.3,
    color: 'black'
  },
  alertTimeText: {
    paddingStart: 11,
    fontFamily: 'Pretendard-Light',
    fontSize: 13,
    letterSpacing: -0.3,
    color: 'black',
    opacity: 0.5
  }
});
