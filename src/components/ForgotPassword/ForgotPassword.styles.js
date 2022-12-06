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
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.titleMainText2,
    lineHeight: 19
  },
  buttonContainer: {
    marginTop: 16,
    height: 44,
    width: '100%',
    borderRadius: 5,
    backgroundColor: Colors.buttonMain
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
    fontSize: 14.5,
    fontWeight: '600',
    color: Colors.buttonDisabledText
  }
});

export default styles;
