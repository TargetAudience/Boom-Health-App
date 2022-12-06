import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '@constants/GlobalStyles';
import {normalizeFont} from '@utils/Responsive';
import {hasNotch} from '@freakycoder/react-native-helpers';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerB: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  introContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.white,
  },
  introContainerAdjustB: {
    paddingTop: 18,
  },
  introContainerAdjust: {
    paddingBottom: 0,
  },
  textIntro: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    lineHeight: 19,
  },
  messageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  servicesInnerContainer: {
    paddingVertical: 20,
    width: width - 40,
    borderColor: Colors.listRowSpacerDark,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    color: Colors.white,
  },
  button: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: width - 20,
    marginTop: 12,
  },
  pricingContainer: {},
  price: {
    textAlign: 'left',
    marginTop: 5,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    color: Colors.black,
    fontWeight: '400',
  },
  services: {
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    lineHeight: 20,
    fontSize: 14.5,
    color: Colors.black,
    fontWeight: '300',
  },
  iconNoteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  iconWorker: {
    width: 25,
    height: 24,
    marginRight: 3,
    marginTop: 1,
  },
  iconText: {
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 6,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    color: Colors.black,
  },
  textServices: {
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
  },
  textPricing: {
    marginTop: 5,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
  },
});

export default styles;
