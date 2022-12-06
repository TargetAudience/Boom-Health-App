import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 22,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 260,
  },
  scrollViewContainer: {
    height: 110,
    overflow: 'hidden'
  },
  cancelLinkContainer: {
    position: 'absolute',
    bottom: 22
  },
  titleText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.nearBlack,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700',
    marginBottom: 20
  },
  buttonText: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 13.5,
    fontWeight: '600'
  },
  helpText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.nearBlack,
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '300'
  }
});

export default styles;
