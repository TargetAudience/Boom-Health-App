import { StyleSheet, Dimensions, Platform } from 'react-native';
import { normalizeFont } from '@utils/Responsive';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
  subHeading: {
    marginTop: 30,
    paddingBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 24,
    letterSpacing: -0.3
  },
  rowContainer: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: hp(12),
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: '#e3e3e3',
    justifyContent: 'space-between',
  },
  deviceImage: {
    width: 100,
    height: 126,
    alignSelf: 'center',
  },
  textDescription: {
    marginTop: 6,
    color: '#1c1c1c',
    textAlign: 'center',
    fontSize: normalizeFont(14),
    fontSize: 14,
    paddingHorizontal: 24,
  },
  shortLineBreak: {
    marginTop: 34,
    marginBottom: 34,
    width: 120,
    height: 1,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
  },
  bulletsContainer: {
    paddingHorizontal: 24,
  },
  recommendedHeading: {
    paddingBottom: 16,
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 24,
    letterSpacing: -0.3
  },
  recommendedContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  recommendedBullet: {
    width: 20,
    height: 20
  },
  recommendedText: {
    color: '#000',
    fontSize: 14.5,
    paddingLeft: 10
  },
  feedbackHeading: {
    marginTop: 24,
    paddingBottom: 16,
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 24,
    letterSpacing: -0.3
  },
  feedbackContainer: {
    backgroundColor: '#ffe1f3',
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 20,
    marginBottom: 12,
  },
  feedbackText: {
    color: '#000',
    fontSize: 15.5,
    lineHeight: 20,
    letterSpacing: -0.1,
    fontStyle: 'italic'
  },
  feedbackTextB: {
    color: '#000',
    fontSize: 14.5,
    paddingTop: 10,
    letterSpacing: -0.1,
  },
  featuresHeading: {
    marginTop: 24,
    paddingBottom: 16,
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 24,
    letterSpacing: -0.3
  },
  featureContainer: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  featureBullet: {
    width: 17,
    height: 17,
    marginTop: 1,
  },
  featureText: {
    color: '#000',
    fontSize: 14.5,
    paddingLeft: 11,
    paddingBottom: 3,
  },
  featureTextB: {
    color: '#000',
    fontSize: 14.5,
    paddingLeft: 11,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginTop: hp(0.2),
    color: '#1c1c1c',
    fontSize: normalizeFont(14),
    marginLeft: 14,
    textTransform: "uppercase"
  },
  description: {
    marginTop: hp(0.6),
    color: '#1c1c1c',
    fontSize: normalizeFont(14),
    letterSpacing: -0.1,
    marginLeft: 14
  },
  navImage: {
    width: hp(9.5),
    height: hp(9.5),
  },
  heart: {
    width: 26,
    height: 22
  },
  sectionHeadingText: {
    marginTop: 2,
    color: '#1c1c1c',
    fontSize: normalizeFont(13),
    marginRight: 10,
    letterSpacing: -0.3,
  },
  sectionHeadingTextBlue: {
    color: '#307ae5',
    fontSize: normalizeFont(16),
    letterSpacing: -0.1,
  },
  heartContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 16
  },
  heartInner: {
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  iconContainer: {
    borderColor: '#000',
    borderWidth: 1.25,
    borderRadius: 70,
    padding: 1
  },
  storyBackground: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyAlign: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#f06cb9'
  },
  storyContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#f06cb9',
    width: width - 40,
    padding: 20,
    paddingBottom: 18,
    paddingTop: 20,
    paddingLeft: 26,
    paddingRight: 24,
    borderRadius: 12,
    alignItems: 'center'
  },
  heartsImage: {
    width: 41,
    height: 29,
    marginTop: -4
  },
  lisasStoryScriptImage: {
    width: 149,
    height: 34
  },
  storyTopContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  buttonReadMoreText: {
    color: '#fff',
    fontSize: normalizeFont(13),
    letterSpacing: -0.35
  },
  storyButtonContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightArrowImage: {
    width: 28,
    height: 15,
    marginLeft: 12
  },
  navigationContainer: {
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  phoneNumberContainer: {
    backgroundColor: '#4f93f5',
    width,
    height: 44,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  phoneNumberContainerB: {
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: 'row',
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#c1daff',
  },
  callUsText: {
    color: '#fff',
    fontSize: normalizeFont(14),
    marginTop: 1,
    marginRight: 4,
    marginLeft: 6
  },
  phoneText: {
    marginTop: 1,
    color: '#fff',
    fontSize: normalizeFont(14),
  },
  phoneNumberInner: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  phoneImage: {
    width: 20,
    height: 20
  },
  buttonMedicationReminders: {
    color: '#1c1c1c',
    fontSize: normalizeFont(14),
    padding: 20
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
  howItWorksHeading: {
    marginTop: 24,
    paddingBottom: 16,
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 24,
    letterSpacing: -0.3
  },
  stepsContainer: {
    marginBottom: 8,
    paddingHorizontal: 24,
    marginRight: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 22,
    alignItems: 'center',
  },
  stepBullet: {
    width: 20,
    height: 20,
    marginTop: 1,
  },
  stepText: {
    color: '#000',
    fontSize: 15,
    paddingBottom: 6,
    paddingLeft: 11,
  },
  stepTextB: {
    color: '#000',
    fontSize: 14.5,
    paddingLeft: 11,
  },
  stepNumber: {
    width: 24,
    height: 24,
    marginTop: 1,
    backgroundColor: '#ff49b8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14.5,
    textAlign: 'center'
  },
  deviceImageContainer: {
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginHorizontal: 18,
    padding: 12,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 24,
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
    marginTop: 30,
  },
});

export default styles;
