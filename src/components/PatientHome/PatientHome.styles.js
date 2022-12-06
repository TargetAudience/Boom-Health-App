import { StyleSheet, Dimensions, Platform } from 'react-native';
import { normalizeFont } from '@utils/Responsive';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerB: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 12,
  },
  spacer: {
    height: 5
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    height: hp(12),
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: '#e3e3e3',
    justifyContent: 'space-between',
  },
  equipmentRenewalContainer: {
    flex: 1,
    width: width - 20,
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: '#f0f4f8',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 20,
  },
  equipmentRenewalTopRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentIconBullet: {
    width: 30,
    height: 29
  },
  equipmentRenewalTitle: {
    color: '#1c1c1c',
    fontSize: normalizeFont(13),
    textTransform: "uppercase",
    letterSpacing: -0.3,
    marginLeft: 10,
  },
  equipmentRenewalSubTitle: {
    marginTop: hp(1),
    color: '#1c1c1c',
    fontSize: normalizeFont(13.75),
    marginBottom: 14
  },
  equipmentRenewalItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  equipmentBullet: {
    width: 20,
    height: 20
  },
  equipmentRenewalItemText: {
    marginTop: 1,
    color: '#1c1c1c',
    fontSize: normalizeFont(13.75),
    marginLeft: 8,
  },
  equipmentRenewalItemTextB: {
    marginTop: 1,
    color: '#1c1c1c',
    fontSize: normalizeFont(13.75),
    marginLeft: 8,
  },
  equipmentButtonText: {
    color: '#fff',
    fontSize: normalizeFont(12.5),
    textTransform: "uppercase",
    textAlign: 'center',
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
  boomHelpContainer: {
    paddingTop: 16,
    paddingBottom: 16,
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
    width: width - 26,
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
  }
});

export default styles;
