import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  outerContainer: {
    marginTop: 90,
    alignItems: 'center'
  },
  containerAlign: {
    marginTop: 20
  },
  textMessage: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: Colors.titleMainText2,
    marginHorizontal: 20,
    lineHeight: 21
  },
  icon: {
    width: 80,
    height: 80
  }
});

export default styles;
