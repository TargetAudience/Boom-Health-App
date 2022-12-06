import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { hasNotch } from '@freakycoder/react-native-helpers';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  '#fff',
  },
  containerB: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  imageBlankState: {
    width: 127,
    height: 100
  },
  blankStateContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  },
  blankStateText: {
    marginTop: 30,
    fontSize: Platform.OS === 'ios' ? 16 : normalizeFont(16),
    color: '#8b96a0',
    textAlign: 'center'
  },
  scrollView: {
    flex: 1,
    marginBottom: 90,
    backgroundColor: Colors.backgroundColor
  },
  bottomContainer: {
    backgroundColor: 'white',
    height: hasNotch() ? 110 : 90,
    borderTopWidth: 1,
    borderColor: '#e1e4e7'
  },


  bottomContainerInner: {
    height: 32,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20
  },  
  bottomContainerInnerB: {
    height: 48,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: 3
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff'
  },
  buyButtonText: {
    fontSize: 18
  },
  textSubtotal: {
    marginTop: 10,
    marginBottom: 5,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    letterSpacing: 0.1,
    lineHeight: 19,
    textAlign: 'left'
  },
  textUpsell: {
    marginTop: 12,
    marginHorizontal: 30,
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    color: Colors.black,
    textAlign: 'center',
    lineHeight: 18
  },
  buttonUpsellContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12
  },
  buttonUpsellText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.white
  }
});

export default styles;
