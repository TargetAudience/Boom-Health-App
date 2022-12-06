import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from '@constants/GlobalStyles';
import {normalizeFont} from '@utils/Responsive';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {hasNotch} from '@freakycoder/react-native-helpers';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerB: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  imageBlankState: {
    width: 100,
    height: 100,
    marginTop: -70,
  },
  blankStateContainer: {
    height: '100%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  blankStateText: {
    marginTop: 30,
    fontSize: Platform.OS === 'ios' ? 16 : normalizeFont(16),
    color: '#8b96a0',
    textAlign: 'center',
  },

  removePadding: {
    marginBottom: 0,
  },
  scrollView: {
    flex: 1,
    marginBottom: 90,
    backgroundColor: Colors.mainBackground,
  },
  bottomContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#e1e4e7',
  },
  bottomContainerInner: {
    height: 32,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
    
  },
  bottomContainerInnerA: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainerInnerB: {
    height: 54,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 3,
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },
  buyButtonText: {
    fontSize: Platform.OS === 'ios' ? 18 : normalizeFont(18),
  },
  textSubtotal: {
    marginTop: 10,
    marginBottom: 5,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14),
    letterSpacing: 0.1,
    lineHeight: 19,
    textAlign: 'left',
  },
  description: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginBottom: 5,
    letterSpacing: 0.1,
    lineHeight: 19,
    textAlign: 'center',
  },
  textMeals: {
    marginTop: 20,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15),
    letterSpacing: 0.1,
    lineHeight: 19,
    textAlign: 'center',
  },
  textDelivery: {
    marginTop: 10,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginBottom: 5,
    lineHeight: 19,
    textAlign: 'center',
  },
  textDescription: {
    marginTop: 15,
    marginHorizontal: 20,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginBottom: 5,
    letterSpacing: 0.1,
    lineHeight: 19,
    textAlign: 'center',
  },
  textUpsell: {
    marginTop: 12,
    marginHorizontal: 30,
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    color: Colors.black,
    textAlign: 'center',
  },
  buttonUpsellContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  buttonUpsetButton: {
    borderColor: Colors.buttonMain,
    borderWidth: 2,
  },
  buttonUpsellText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.white,
  },
  buttonAllergiesButton: {
    borderColor: Colors.buttonMain,
    borderWidth: 2,
  },
  buttonTextB: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(13),
    textAlign: 'center',
    color: Colors.buttonMain,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textAllergiesMessage: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(12),
    marginLeft: wp(3),
    marginTop: 1,
    textAlign: 'left',
  },
  headerContainer: {
    backgroundColor: '#f4f4f4',
  },
  header: {
    width: '100%',
    alignSelf: 'flex-start',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14),
    paddingTop: 15,
    paddingLeft: 20,
    color: Colors.nearBlack,
    textTransform: 'uppercase',
  },
  subHeaderText: {
    width: '100%',
    alignSelf: 'flex-start',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14),
    paddingTop: Platform.OS === 'ios' ? 4 : 0,
    paddingBottom: 14,
    paddingLeft: 20,
    color: '#494949',
  },
});

export default styles;
