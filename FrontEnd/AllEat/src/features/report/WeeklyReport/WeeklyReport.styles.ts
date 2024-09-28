import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  weeklyReportContainer: {
    padding: '4%',
  },
  dateNavigatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  date: {
    color: 'black',
    fontFamily: 'Pretendard-Bold',
    fontSize: 19
  },
  ReportContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 15
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
