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
  textSubTitle: {
    textAlign: 'left',
    color: Colors.textMain,
    fontSize: Platform.OS === 'ios' ? 14.5 : 13.5,
    marginBottom: 16,
    marginLeft: 0
  },
});

export default styles;
