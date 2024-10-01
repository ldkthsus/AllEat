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
    fontFamily: 'pre'
  },
  arrowBackLeft: {
    marginRight: 20,
  },
  arrowBackRight: {
    marginLeft: 20,
  },
  notificationIcon: {
    position: 'absolute',
    right: 40,
    zIndex:-1
  },
  notiBadge: {
    position: 'absolute',
    right: 35,
    top: 5,
  },
});
