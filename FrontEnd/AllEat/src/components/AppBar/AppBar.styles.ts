import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  text: {
    color: '#3d3d3d',
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    marginTop: 3,
  },
  icon: {
    width: '25%',
    display: 'flex',
    alignItems: 'center',
  },
  appBar: {
    shadowColor: 'black', // iOS 그림자 색상
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4, // iOS 그림자 반경
    elevation: 15, // Android 그림자 높이
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 15,
    paddingTop: 10,
  },
});
