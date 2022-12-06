import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  creditCardIcon: {
    position: 'absolute',
    bottom: -9,
    left: 6,
    zIndex: 9999
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'left'
  },
  labelStyle: {
    color: '#000',
    fontSize: 14,
    flex: 1,
    paddingBottom: 4,
    marginLeft: 2
  }
});

export default styles;
