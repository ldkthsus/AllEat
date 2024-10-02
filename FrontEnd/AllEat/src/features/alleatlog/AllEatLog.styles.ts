import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  topbar: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'pre',
  },
  arrowBackLeft: {
    marginRight: 20,
  },
  arrowBackRight: {
    marginLeft: 20,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  allText: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 20,
  },
  textBlack: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    marginTop: 10,
  },
  textBlue: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: '#769BFF',
    marginTop: 10,
  },
  dayLog: {
    marginBottom: 20,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  diarySection: {
    marginBottom: 15,
  },
  diaryTime: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  diaryInfo: {
    fontSize: 14,
    color: '#555',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  menuText: {
    fontSize: 14,
    color: '#333',
  },
  menuCost: {
    fontSize: 14,
    color: '#555',
  },
});
