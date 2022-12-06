import { StyleSheet, Platform } from 'react-native';
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
    color: Colors.textMain
  },
  labelStyle: {
    color: '#000',
    fontSize: Platform.OS === 'ios' ? 14 : 13.5,
    fontWeight: '400',
    paddingBottom: 4,
    marginLeft: 2
  },
  instructionsText: {
    fontSize: 14,
    color: '#1c1c1c',
    textAlign: 'left',
    marginBottom: 4,
    marginTop: 6
  },
});

export default styles;
