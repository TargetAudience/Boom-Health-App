import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  topGap: {
    marginTop: 24,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    marginTop: 16
  },
  instructionsText: {
    fontSize: 14,
    color: '#1c1c1c',
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 24,
    fontWeight: '400'
  }
});

export default styles;
