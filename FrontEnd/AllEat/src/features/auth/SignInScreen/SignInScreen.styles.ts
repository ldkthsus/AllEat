import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 20,
    color: '#3d3d3d',
    fontFamily: 'Pretendard',
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
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
    fontWeight: '600',
  },
  orText: {
    fontSize: 16,
    color: '#d4d4d4',
    marginVertical: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  signupTextContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    fontWeight: '600',
    color: '#769bff',
    marginLeft: 5,
  },
  text: {
    fontSize: 16,
    color: '#3d3d3d',
  },
});
