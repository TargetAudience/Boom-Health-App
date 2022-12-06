import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  topGap: {
    marginTop: 32,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1, 
    marginTop: 16
  },
  forgotPasswordText: {
    textAlign: 'left',
    color: '#099962',
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
    color: Colors.greenText
  }
});

export default styles;
