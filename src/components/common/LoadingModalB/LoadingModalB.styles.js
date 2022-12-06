import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 110
  },
  loadingText: {
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  },  
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginTop: 4
  }
});

export default styles;
