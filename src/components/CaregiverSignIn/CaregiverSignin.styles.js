import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  textIntro: {
    marginTop: 110,
    marginBottom: 40,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.blueText,
    lineHeight: 18
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'center',
  },
  buttonSignInText: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.white
  },
  buttonSignInTextDisabled: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.buttonDisabledText
  },
  inputStyle: {
    flex: 1,
    color: '#1a1b1d',
    fontSize: 15.5,
    marginLeft: 12,
    fontWeight: '400'
  },
  containerStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.formFieldBackground,
    height: 44,
    borderRadius: 5,
    borderColor: Colors.formFieldBorder,
    borderWidth: 1
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: '#099962',
    fontSize: 13,
    fontWeight: '600'
  },
  buttonSignIn: {
    backgroundColor: Colors.buttonBlue,
    borderRadius: 4,
    width: 190,
    height: 40
  },
  buttonSignInDisabled: {
    backgroundColor: Colors.buttonDisabled,
    borderRadius: 4,
    width: 190,
    height: 40
  }
});

export default styles;
