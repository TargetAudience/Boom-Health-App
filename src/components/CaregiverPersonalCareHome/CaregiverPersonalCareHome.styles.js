import { StyleSheet, Dimensions, Platform } from 'react-native';
import { normalizeFont } from '@utils/Responsive';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '@constants/GlobalStyles';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8'
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
  textWelcome: {
    color: '#000',
    fontSize: 18,
    marginTop: 15
  },
  textWelcome2: {
    color: '#000'
  },
  welcomeContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: '#e6e6ea',
  },
  leftLabelText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.75),
    marginTop: 2,
    color: '#1c1c1c',
    fontWeight: '600'
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
    textTransform: 'uppercase',
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
    backgroundColor: '#f7f8fa',
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyContainer: {
    backgroundColor: '#f06cb9',
    width: width - 40,
    padding: 20,
    borderRadius: 12,
    flex: 0,
    flexGrow: 0
  },
  heartsImage: {
    width: 41,
    height: 29
  },
  lisasStoryScriptImage: {
    width: 149,
    height: 34
  },
  storyTopContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  textStoryIntro: {
    marginTop: 8,
    color: '#fff',
    fontSize: normalizeFont(12.25)
  },
  textStoryBody: {
    marginTop: 4,
    color: '#fff',
    fontSize: normalizeFont(12.25)
  },
  buttonReadMoreText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    color: '#fff',
    fontSize: normalizeFont(11.25),
    marginRight: 10,
    marginLeft: 10,
    letterSpacing: -0.3,
    textTransform: 'uppercase'
  },
  buttonReadMore: {
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: '#fff',
    alignSelf: 'baseline'
  }
});

export default styles;
