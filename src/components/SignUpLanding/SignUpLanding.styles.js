import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundBlue
  },
  logo: {
    marginTop: -40,
    width: 110,
    height: 88
  },
  textIntro: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 26,
    fontWeight: '300',
    textAlign: 'center',
    color: Colors.white
  },
  buttonPatient: {
    marginTop: 30
  },
  buttonCaregiverText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.titleTextMain,
    fontSize: 14.5,
    fontWeight: '600',
  },
  buttonPatientText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 14.5,
    fontWeight: '600',
  },
  textAlready: {
    marginTop: 60,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 13.5,
    fontWeight: '500'
  }
});

export default styles;
