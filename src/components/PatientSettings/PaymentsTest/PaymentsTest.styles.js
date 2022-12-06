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
  },
  instructionsText: {
    fontSize: 14,
    color: '#1c1c1c',
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 24,
    fontWeight: '400'
  },
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
});

export default styles;
