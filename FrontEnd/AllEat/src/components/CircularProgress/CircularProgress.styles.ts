// CircularProgress.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svgContainer: {
    position: 'absolute',
  },
  currentText: {
    fontSize: 30,
    color: '#769BFF',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 20,
    color: 'black',
  },
});
