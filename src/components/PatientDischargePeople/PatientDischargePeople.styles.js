import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  rowContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    alignItems: 'center',
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftLabelText: {
    fontSize: Platform.OS === 'ios' ? 14.5 : 13.5,
    marginTop: 2,
    color: '#1c1c1c'
  },
  leftLabelSubText: {
    fontSize: Platform.OS === 'ios' ? 13.5 : 12.5,
    marginTop: 2,
    color: '#1c1c1c'
  },
  spacer: {
    width: '100%',
    height: 16,
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  signOutButtonContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#8795a8',
    borderRadius: 3,
    padding: 8,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20
  },
  signOutButtonText: {
    marginTop: 1,
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: -0.15,
    textAlign: 'center'
  },
  signedInAsText: {
    color: '#8f8f8f',
    fontSize: 12
  },
  emailText: {
    color: '#1c1c1c',
    fontSize: 12,
    paddingTop: 5,
    letterSpacing: 0.1
  },
  usernameContainer: {
    flexDirection: 'column',
    marginHorizontal: 5,
    paddingTop: 8,
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 8
  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    color: Colors.white,
    marginTop: Platform.OS === 'ios' ? 1 : 0,
  },
  button: {
    marginBottom: 8,
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 12
  },
});

export default styles;
