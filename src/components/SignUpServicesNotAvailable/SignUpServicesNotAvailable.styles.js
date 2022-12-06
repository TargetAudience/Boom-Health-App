import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  containerAlign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  textMessage: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.blueText,
    marginHorizontal: 40
  },
  textMessageB: {
    marginTop: 16,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.blueText,
    marginHorizontal: 40,
    lineHeight: 21
  },
  icon: {
    marginTop: -60,
    width: 80,
    height: 80
  },
  buttonContainer: {
    marginTop: 42
  },
  buttonText: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 14.5
  },
});

export default styles;
