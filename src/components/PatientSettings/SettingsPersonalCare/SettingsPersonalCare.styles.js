import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
  creditContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderRadius: 6,
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.titleTextMain
  },
  creditItem: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  creditTitleText: {
    fontSize: 14.5,
    marginBottom: 5,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  creditLabelText: {
    fontSize: 14.5,
    marginTop: 2,
    color: '#fff',
    fontWeight: '500'
  },
  leftLabelText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.75),
    marginTop: 2,
    color: '#1c1c1c',
    fontWeight: '600'
  },
  spacer: {
    width: '100%',
    height: 16,
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  signOutButtonContainer: {
    borderRadius: 3,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 15
  },
  signOutButtonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 13 : normalizeFont(12.75),
    letterSpacing: -0.15,
    textAlign: 'center'
  },
  signedInAsText: {
    color: '#8f8f8f',
    fontSize: Platform.OS === 'ios' ? 11 : normalizeFont(11),
  },
  emailText: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 12 : normalizeFont(11),
    paddingTop: 5,
    letterSpacing: 0.1
  },
  usernameContainer: {
    paddingTop: 20,
    alignItems: 'center',
    marginBottom: 4
  },
  appVersionText: {
    marginTop: 10,
    fontSize: Platform.OS === 'ios' ? 12 : normalizeFont(11),
    alignSelf: 'center',
    color: '#8f8f8f',
    fontWeight: '300',
    marginBottom: 45
  },
});

export default styles;
