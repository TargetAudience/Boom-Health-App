import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  topGap: {
    marginTop: 32,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    marginTop: 16
  },
  buttonText: {
    color: 'white',
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    fontSize: 14.5,
    letterSpacing: -0.15
  }
});

export default styles;
