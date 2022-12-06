import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { hasNotch } from '@freakycoder/react-native-helpers';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
  iconCheckmark: {
    width: 22,
    height: 22
  },
  downArrowIcon: {
    width: 30,
    height: 30,
    marginTop: -4
  },
  cellContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: 6,
    marginHorizontal: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#e1e4e7'
  },
  cellTop: {
    backgroundColor: '#4f93f5',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15
  },
  cellInner: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
  },
  textContainer: {
    width: width - 116,
    borderWidth: 0,
    borderColor: 'green',
  },
  rightButtonContainer: {
    borderWidth: 0,
    borderColor: 'red',
  },

  textTitleSection: {
    fontSize: Platform.OS === 'ios' ? 15.0 : normalizeFont(14.5),
    color: '#fff',
    letterSpacing: -0.1,
  },
  textTask: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    marginTop: 2,
    marginBottom: 6,
    color: '#1c1c1c',
  },
  textAssignee: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    marginTop: 2.5,
    color: '#1c1c1c',
  },
  textAssigneeLabel: {
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
    marginTop: 2.5,
    color: '#999999',
  },

  gapMiddle: {
    marginTop: 10
  },
  sectionList: {
    paddingTop: 16,
  },

  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    color: Colors.white,
    marginTop: Platform.OS === 'ios' ? 1 : 0,
  },
  button: {
    marginBottom: 8,
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  
  actionSheetItem: {
    borderWidth: 1,
    borderColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#bbb9bb',
    width: '100%',
  },
  textActionSheet: {
    fontSize: 20,
    fontWeight: '400',
    color: '#0072fa',
  },
  textActionSheetCancel: {
    fontSize: 20,
    fontWeight: '400',
    color: '#ff0024',
  },
  instructionsContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 14,
    backgroundColor: '#edf1f2',
    borderRadius: 12,
  },
  instructionsText: {
    fontSize: Platform.OS === 'ios' ? 15 : 14.5,
    color: '#1c1c1c',
    lineHeight: 20,
    textAlign: 'left',
  },
});

export default styles;
