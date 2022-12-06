import { StyleSheet, Dimensions, Platform } from 'react-native';
import { normalizeFont } from '@utils/Responsive';
import { hasNotch } from '@freakycoder/react-native-helpers';

const { width } = Dimensions.get('screen');

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
    backgroundColor: '#fff'
  },
  svgCurve: {
    position: 'absolute',
    width,
  },
  headingContainer: {
    height: 210
  },
  heading: {
    paddingTop: 64,
    textAlign: 'center',
    fontSize: 22,
    paddingHorizontal: 20,
    color: '#1c1c1c',
    letterSpacing: -0.3
  },
  headingB: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 17,
    paddingHorizontal: 20,
    color: '#1c1c1c',
    letterSpacing: -0.4
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
    marginTop: 3
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
  },
  photo: {
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    width: 180,
    height: 200,
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 38,
  },
});

export default styles;
