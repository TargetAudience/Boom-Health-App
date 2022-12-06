import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    padding: 12,
    paddingTop: 34,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 260,
  },
  scrollViewContainer: {
    overflow: 'hidden',
    height: 90
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cancelLinkContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 22
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
  },
  closeContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 9999
  },
  close: {
    width: 13,
    height: 13
  },
  instructionsText: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.nearBlack,
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 12
  },
  checkbox: {
    marginTop: 5, 
    marginBottom: 5
  },
  deliveryContainer: {
    marginBottom: 12,
  },
  deliveryInner: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textCheckmark: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginLeft: 8,
    marginTop: 2,
    textAlign: 'left'
  },
  buttonSignInText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    fontWeight: '600',
    color: Colors.white
  },
  buttonSignInTextDisabled: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    fontWeight: '600',
    color: Colors.buttonDisabledText
  },
  buttonSignIn: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: '100%',
    height: 36
  },
  buttonSignInDisabled: {
    backgroundColor: Colors.buttonMainDisabled,
    borderRadius: 4,
    width: '100%',
    height: 36
  },
  promoLogo: {
    width: 96,
    height: 77,
    marginBottom: 24,
    alignSelf: 'center'
  }
});

export default styles;
