import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  headerTextAlign: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '400',
    color: Colors.titleMainText2,
  },
  textAlign: {
    marginTop: 10,
    marginBottom: 78,
    textAlign: 'center',
    marginHorizontal: 25,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.titleMainText2,
    lineHeight: 19
  },
  iconMain: {
    alignSelf: 'center',
    marginTop: 138,
    marginBottom: 30,
    width: 82,
    height: 55
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  buttonSignInText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14.5,
    fontWeight: '600',
    color: Colors.white
  },
});

export default styles;
