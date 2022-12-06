import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 15,
    left: 10,
    zIndex: 9999,
  },
  containerClose: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  arrowBack: {
    width: 20,
    height: 16
  },
  arrowClose: {
    width: 18,
    height: 18
  }
});

export default styles;
