import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#3D3D3D', // 회색 텍스트 색상
    fontWeight: '300',
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
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#000', // 기본 텍스트 색상
  },
});
