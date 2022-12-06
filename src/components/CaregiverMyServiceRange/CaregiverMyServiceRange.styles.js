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
  instructionsText: {
    fontSize: 14,
    color: '#1c1c1c',
    textAlign: 'left',
    marginBottom: 14
  },
  buttonText: {
    color: 'white',
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    fontSize: 14.5,
    letterSpacing: -0.15
  },
});

export default styles;
