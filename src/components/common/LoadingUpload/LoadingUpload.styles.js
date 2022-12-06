import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
    backgroundColor: 'rgba(52, 52, 52, 0)'
  },
  innerContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  innerContainerB: {
    width: width * 0.6,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    paddingHorizontal: 20
  },
  uploadingText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
    marginBottom: 8
  },
  progressBarBackground: {
    backgroundColor: '#dfdfdf',
    borderRadius: 4
  }
});

export default styles;
