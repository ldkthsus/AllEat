import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Pretendard-Regular',
    color: '#3d3d3d',
  },
  text1: {
    fontFamily: 'Pretendard-ExtraBold',
  },
  text2: {
    fontFamily: 'Pretendard-Bold',
  },
  socialContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    gap: 10,
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
  },
  orText: {
    fontSize: 16,
    color: '#d4d4d4',
    marginVertical: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 10,
  },
  loginTextContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  loginText: {
    fontFamily: 'Pretendard-ExtraBold',
    color: '#769bff',
    marginLeft: 5,
    fontSize: 16,
  },
});
