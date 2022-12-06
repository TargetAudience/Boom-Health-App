import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  topGap: {
    marginTop: 20,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructionsText: {
    fontSize: 14,
    color: '#1c1c1c',
    lineHeight: 18,
    textAlign: 'left',
    marginBottom: 24
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  }
});

export default styles;
