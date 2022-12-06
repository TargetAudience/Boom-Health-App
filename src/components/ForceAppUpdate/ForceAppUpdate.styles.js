import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundBlue,
    paddingHorizontal: 20
  },
  logo: {
    marginTop: -40,
    width: 110,
    height: 88
  },
  textIntro: {
    marginTop: 90,
    fontSize: 26,
    fontWeight: '300',
    textAlign: 'center',
    color: Colors.white
  },
  textIntroB: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 15.5,
    fontWeight: '300',
    textAlign: 'center',
    color: Colors.white
  },
  buttonText: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.titleTextMain,
    fontSize: 14.5,
    fontWeight: '600',
  }
});

export default styles;
