import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  topGap: {
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 12
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
    fontSize: Platform.OS === 'ios' ? 14.5 : 13.5,
    color: '#1c1c1c',
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 12,
  },
  instructionsTextB: {
    fontSize: Platform.OS === 'ios' ? 14.5 : 13.5,
    color: '#1c1c1c',
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 24,
  }
});

export default styles;
