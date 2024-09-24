import {StyleSheet} from 'react-native';

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
  title: {
    fontSize: 18,
    marginBottom: 50,
    color: '#3d3d3d',
    fontFamily: 'Pretendard-Bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateSection: {
    borderLeftWidth: 3,
    borderColor: '#769BFF',
    marginLeft: 30,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  dateIcon: {position: 'absolute', left: -13},
  dateText: {
    color: '#769BFF',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
  },
  transactionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  transactionDetails: {flexDirection: 'row'},
  transactionDetailTitle: {
    color: '#3d3d3d',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
  transactionDetailText: {
    color: '#3d3d3d',
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
  },
  transactionItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 15,
  },
});
