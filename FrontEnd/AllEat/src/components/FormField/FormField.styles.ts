import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    color: '#3D3D3D', // 회색 텍스트 색상
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 3,
  },
  inputContainer: {
    width: '100%',
    height: 56, // h-16 in Tailwind
    paddingHorizontal: 16,
    backgroundColor: 'white', // 배경색
    borderRadius: 16, // rounded-2xl in Tailwind
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1, // 테두리 두께
    borderColor: 'lightgray', // 회색 테두리 색상
    marginBottom: 8,
  },
  unit: {
    fontFamily: 'Pretendard-SemiBold',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Pretendard-ExtraLight',
    color: '#000', // 기본 텍스트 색상
  },
});
