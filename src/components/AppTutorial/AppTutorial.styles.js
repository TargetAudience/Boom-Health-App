import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const { width } = Dimensions.get('screen');
const circleDiameter = width - 110;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundBlue,
  },
  logo: {
    marginTop: 0,
    marginBottom: 20,
    width: 90,
    height: 72,
    alignSelf: 'center'
  },
  flexDivided1: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  flexDivided2: {
    height: circleDiameter,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
    borderWidth: 0,
    borderColor: 'red',
  },
  flexDivided3: {
    marginTop: 50,
    justifyContent: 'flex-start',
    borderWidth: 0,
    borderColor: 'orange',
  },
  textIntro: {
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    color: Colors.white
  },
  buttonsContainer: {
    borderWidth: 0,
    borderColor: 'green',
    height: 120,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonBottomLeft: {
    borderWidth: 1,
    borderColor: Colors.white
  },
  textSignIn: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 14.5,
    fontWeight: '600',
  },
  textSignUp: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.textMain,
    fontSize: 14.5,
    fontWeight: '600',
  },
  video: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: width - 40, 
    aspectRatio: 1.78,
    marginHorizontal: 20
  },
  playButtonOutside: {
    width: circleDiameter,
    height: circleDiameter,
    marginHorizontal: 40,
    backgroundColor: '#fff',
    opacity: 0.05,
    borderRadius: circleDiameter * 0.5
  },
  imagePlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40
  },
  imagePause: {
    zIndex: 999,
    opacity: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
    width: 40,
    height: 40
  },
  buttonCaregiverText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.titleTextMain,
    fontSize: 14.5
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
    textAlign: 'center',
    color: Colors.white,
    fontSize: 13.5,
    fontWeight: '500',
  },
  buttonsRow: {
    borderWidth: 0,
    borderColor: 'green',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    flexDirection: 'row',
    width: '100%',
  }
});

export default styles;
