import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  actionSheetItem: {
    borderWidth: 1,
    borderColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#bbb9bb',
    width: '100%',
  },
  textActionSheet: {
    fontSize: 20,
    fontWeight: '400',
    color: '#0072fa',
  },
  textActionSheetCancel: {
    fontSize: 20,
    fontWeight: '400',
    color: '#ff0024',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  topGap: {
    marginTop: 24,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1, 
    marginTop: 16
  },
  forgotPasswordText: {
    textAlign: 'left',
    color: Colors.buttonMain,
    fontSize: 13.5,
    fontWeight: '500'
  },
  textTerms: {
    textAlign: 'left',
    color: '#1c1c1c',
    fontSize: 14.5,
    fontWeight: '400',
    marginTop: 10
  },
  checkbox: {
    marginTop: 5, 
    marginBottom: 5
  },
  textTermsUnderline: {
    textDecorationLine: 'underline',
    color: Colors.buttonMain
  }
});

export default styles;
