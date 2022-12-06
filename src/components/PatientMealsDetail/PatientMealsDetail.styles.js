import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { hasNotch } from '@freakycoder/react-native-helpers';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
    backgroundColor: 'white'
  },
  scrollView: {
    flex: 1, 
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1, 
  },
  extraSpace: {
    height: 40, // bottomContainer plus extra.
  },
  bottomContainer: {
    backgroundColor: 'white',
    height: 68,
    borderTopWidth: 1,
    borderColor: '#e1e4e7'
  },
  bottomContainerInner: {
    height: 68,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  button: {
    marginTop: 3
  },
  buttonText: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    textAlign: 'center',
    color: '#fff'
  },
  alignRight: {
    position: 'absolute',
    right: 0,
    textAlign: 'right'
  },
  imageMain: {
    width: width - 40,
    height: width - 40
  },
  textName: {
    marginTop: 20,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 16 : normalizeFont(16),
    letterSpacing: 0.1,
    lineHeight: Platform.OS === 'ios' ? 19 : 18,
    textAlign: 'center'
  },
  textDescription: {
    marginTop: 15,
    marginHorizontal: 20,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginBottom: 5,
    letterSpacing: 0.1,
    lineHeight: Platform.OS === 'ios' ? 19 : 18,
    textAlign: 'center'
  },
  textCardSubtitle: {
    marginTop: 15,
    marginHorizontal: 20,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    letterSpacing: 0.1,
    lineHeight: Platform.OS === 'ios' ? 19 : 18,
    textAlign: 'center'
  },
  textCardNutrition: {
    marginTop: 5,
    marginHorizontal: 20,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginBottom: 5,
    letterSpacing: 0.1,
    lineHeight: Platform.OS === 'ios' ? 19 : 18,
    textAlign: 'center'
  }
});

export default styles;
