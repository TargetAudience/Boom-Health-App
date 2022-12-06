import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { hasNotch } from '@freakycoder/react-native-helpers';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerB: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  scrollView: {},
  timeDateText: {
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    textAlign: 'right',
    color: '#1c1c1c'
  },
  messageContainerB: {

    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.listRowSpacer
  },
  bottomContainer: {
    backgroundColor: 'white',
    height: 68,
    borderTopWidth: 1,
    borderColor: '#e1e4e7',
  },
  bottomContainerInner: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'green',
  },

  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.white
  },
  button: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: width - 20,
    marginTop: 12
  },
  textIntro: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    lineHeight: 19
  },
  textIntroB: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    lineHeight: 19,
    paddingTop: 16,
  },
  introContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.white
  },
  introContainerB: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.white
  },
  bullet: {
    width: 10,
    height: 10,
    borderWidth: 0,
    borderColor: 'red',
    marginTop: Platform.OS === 'ios' ? 4 : 6,
  },
  bulletContainer: {
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 0,
    borderColor: 'red'
  },
  bulletContainerTop: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  bulletLabel: {
    marginLeft: 6,
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.black,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  iconNoteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  iconWorker: {
    width: 25,
    height: 24,
    marginRight: 3,
    marginTop: 1
  },
  calendarWhite: {
    width: 17,
    height: 17,
    marginRight: 10,
    marginTop: 1
  },
  iconTime: {
    width: 17,
    height: 17,
    marginRight: 10,
    marginTop: 1
  },
  iconText: {
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 6,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    color: Colors.black
  },
  bulletTitle: {
    marginTop: 12,
    marginLeft: 20,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    color: Colors.black
  },
  messageContainer: {
    backgroundColor: 'white',
    alignItems: 'center'
  },
  servicesInnerContainer: {
    paddingTop: 20,
    paddingBottom: 16,
    width: width - 40,
    borderColor: Colors.listRowSpacerDark,
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  pricingContainer: {},
  price: {
    textAlign: 'left',
    marginTop: 5,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    color: Colors.black,
    fontWeight: '400'
  },
  services: {
    textAlign: 'left',
    marginTop: 5,
    lineHeight: 20,
    fontSize: 14.5,
    color: Colors.black,
  },
  iconNoteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4
  },
  iconWorker: {
    width: 25,
    height: 24,
    marginRight: 3,
    marginTop: 1
  },
  iconText: {
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 6,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    color: Colors.black
  },
  textServices: {
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5)
  },
  formWrapper: {
    backgroundColor: Colors.white,
    paddingBottom: 20,
  },
  listItemContainer: {
    height: 50
  },
  listItemImage: {
    width: 19,
    height: 19,
  }
});

export default styles;
