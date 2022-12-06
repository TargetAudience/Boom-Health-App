import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  textIntro: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'left',
    color: Colors.titleMainText2
  },
  textIntro2: {
    marginBottom: 26,
    marginTop: 4,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    color: Colors.titleMainText2
  },
  buttonContainer: {
    flex: 1, 
    marginTop: 16,
    marginBottom: 30
  },
  buttonSignInText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14.5,
    fontWeight: '600',
    color: Colors.white
  },
  buttonSignInTextDisabled: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.buttonDisabledText
  },
  buttonSignIn: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: '100%',
    height: 44
  },
  buttonSignInDisabled: {
    backgroundColor: Colors.buttonMainDisabled,
    borderRadius: 4,
    width: '100%',
    height: 44
  },
  forgotPasswordText: {
    textAlign: 'left',
    color: Colors.textMain,
    fontSize: 13.5,
    fontWeight: '500'
  },
  iconHand: {
    width: 48,
    height: 46,
    marginTop: -10,
    marginLeft: 10
  },
  welcomeContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  miniButtonsContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20
  },
  miniButton: {
    width: 30,
    height: 30,
    borderRadius: 3,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2
  },
  miniButtonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: Colors.white
  },
});

export default styles;
