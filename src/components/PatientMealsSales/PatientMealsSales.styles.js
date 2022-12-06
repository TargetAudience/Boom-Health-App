import {StyleSheet, Dimensions, Platform} from 'react-native';
import {normalizeFont} from '@utils/Responsive';
import {hasNotch} from '@freakycoder/react-native-helpers';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3e2fa',
  },
  containerB: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    height: '100%',
    paddingBottom: hasNotch() ? 88 : 68,
    backgroundColor: '#fff',
  },
  svgCurve: {
    position: 'absolute',
    width,
  },
  headingContainer: {
    height: 210,
  },
  heading: {
    paddingTop: 64,
    textAlign: 'center',
    fontSize: 22,
    paddingHorizontal: 20,
    color: '#1c1c1c',
    letterSpacing: -0.3,
  },
  headingB: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 17,
    paddingHorizontal: 20,
    color: '#1c1c1c',
    letterSpacing: -0.4,
  },
  textBody: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: normalizeFont(14.5),
    lineHeight: 20,
    paddingHorizontal: 24,
    letterSpacing: -0.3,
    fontWeight: '400',
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
  button: {
    marginTop: 3,
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
  },
  photoLady: {
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    width: 180,
    height: 200,
  },
  photoLadyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 38,
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 20,
    borderWidth: 0,
    borderColor: 'red',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'red',
    flex: 1,
    justifyContent: 'center',
  },
  cardImage: {
    backgroundColor: '#dddddd',
    height: 209,
    width: 290,
    borderRadius: 16,
    borderWidth: 0,
    borderColor: 'red',
  },
  gridImage: {
    height: '100%',
    width: '32%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  moreImage: {
    width: 26,
    height: 26,
  },
  gridCell: {
    height: '100%',
    width: '32%',
    aspectRatio: 1,
  },
  gridEmpty: {
    backgroundColor: '#ebeaea',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gapBottom: {
    height: 20,
  },
  safeAreaContainer: {
    flex: 1,
  },
  viewLeft: {
    flex: 1,
  },
  arrowBack: {
    width: 16,
    height: 16,
    marginLeft: 16,
  },
});

export default styles;
