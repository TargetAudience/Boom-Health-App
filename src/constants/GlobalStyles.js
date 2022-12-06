import { Platform } from 'react-native';
import { normalizeFont } from '@utils/Responsive';

// Third color:
// mint - B3E9C7
// green -= 23F0C7
// yellow - FDE74C - -good
// green  9BC53D - good
// yellow - FDCA40 - great
// green A1E887
// yello E6C229

const Colors = {
  textMain: '#468de9', // Blue
  buttonMain: '#ff49b8',
  buttonMainDisabled: '#f6c4e2',
  buttonSecondary: '#468de9',
  mainAlternative: '#f86fc3',
  titleTextMain: '#ff49b8', // Pink
  secondary: '#0bce83',
  secondaryText: '#19ad74',
  secondaryDisabled: '#56b691',
  titleMainText2: '#1b314d',
  highlight: '#FDCA40', // Yellow
  indicator: '#f81d23',
  mainBackground: '#f6f9fa',
  white: '#FFFFFF',
  gray: '#BFC5D2',
  red: '#fa4b50',
  green: '#fa4b50',
  background: '#f7f8fa',
  backgroundBlue: '#5197e9',
  blueButtonText: '#2f527c',
  buttonBlue: '#1064a8',
  buttonBorderGrey: '#dfdfe1',
  greenButton: '#23b873',
  greenButtonDisabled: '#a4d0bc',
  greenText: '#00a062',
  greenTextDisabled: '#edf2f0',
  greenButtonB: '#12b971',
  blueText: '#2a5589',
  grayButton: '#acb4c6',
  lightGreyBackground: '#f8f8f8',
  darkGrayButton: '#8997b5',
  formFieldBackground: '#ffffff',
  formFieldBackgroundDark: '#ECECEC',
  formFieldDisabledBackground: '#e3e9f0',
  formFieldBorder: '#e6e5ea',
  formFieldPlaceholder: '#7c8390',
  buttonDisabled: '#d8e0eb',
  buttonDisabledText: '#bf2a83',
  buttonPartiallyDisabled: '#85a4be',
  placeholder: '#7c8595',
  nearBlack: '#1c1c1c',
  listRowSpacer: '#dedde2',
  listRowSpacerDark: '#cfced3',
  trackColor: '#468de9',
  trackColorFalse: '#eeeeee',
  orangeText: '#f29e31',
  redText: '#ee4242',
  calendarBackground: '#f3f6f8',
  orange: '#f48047',
  blue: '#3897f0',
  black: '#000000',
  subText: '#999a9f',
  mainText: '#585e6a',
  selectedCalDateBackground: '#3897f0',
  markedCalDateBorder: '#3897f0',
  markedCalDateBorderOrange : '#f48047',
  unSelectedCalDateBackground: '#badaf8',
  hardHairline: '#c0c0c0',
  blackTransparent: '#00000090'
};

// 815ddf, 9473e8, 8073e8, 7373e8, 6776e4, 6784e4
const Sizes = {
  font: 15,
  h1: 48,
  h2: 34,
  h3: 28,
  h4: 22,
  paragraph: 15,
  caption: 13,
  captionMedium: 12
};

const Fonts = {
  baseFont: 'SFProText-Regular',
  headerFont: 'SFProText-Bold'
};

const FormStyles = {
  keyboardContainer: {
    flex: 1
  },
  inputContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.formFieldBackground,
    height: 46,
    borderRadius: 5,
    borderColor: Colors.formFieldBorder,
    borderWidth: 1,
    width: '100%'
  },
  inputContainerDark: {
    backgroundColor: Colors.formFieldBackgroundDark,
    borderColor: Colors.formFieldBorder,
  },
  inputContainerMultiLine: {
    alignItems: 'flex-start',
    height: 140,
    paddingTop: 2,
    textAlign: 'left',
    paddingLeft: 10
  },
  inputContainerMultiLineSmall: {
    alignItems: 'flex-start',
    height: 60,
    paddingTop: 2,
    textAlign: 'left',
    paddingLeft: 10
  },
  inputContainerDisabled: {
    backgroundColor: Colors.formFieldDisabledBackground
  },
  inputStyleMultiLine: {
    width: '100%',
    height: 132
  },
  inputContainerLabel: {
    marginBottom: 12,
  },
  inputContainerBoldLines: {
    borderWidth: 2
  },
  inputStyle: {
    flex: 1,
    color: '#1a1b1d',
    fontSize: 15.5,
    marginLeft: 8,
    width: '100%',
    fontFamily: 'SFProText-Regular'
  },
  inputStyleBold: {
    flex: 1,
    color: '#1a1b1d',
    fontSize: 16,
    marginLeft: 8,
    width: '100%',
    fontFamily: 'SFProText-Bold'
  },
  inputSelect: {
    marginBottom: 8,
    justifyContent: 'flex-start',
    height: 46,
    width: '100%',
    backgroundColor: 'white',
    borderColor: Colors.formFieldBorder,
    borderWidth: 1,
    borderRadius: 5
  },
  inputSelectDisabled: {
    marginBottom: 8,
    justifyContent: 'flex-start',
    height: 46,
    width: '100%',
    backgroundColor: '#E7E7E7',
    borderColor: Colors.formFieldBorder,
    borderWidth: 1,
    borderRadius: 5
  },
  inputSideBySide: {
    flexDirection: 'row'
  },
  inputSideBySideInner: {
    flex: 1
  },
  sideBySideFirst: {
    marginRight: 10
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.white
  },
  buttonTextDisabled: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
    color: Colors.buttonDisabledText
  },
  button: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: '100%',
    height: 44
  },
  buttonHalf: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    height: 36,
    width: '96%'
  },
  buttonHalfDisabled: {
    backgroundColor: Colors.buttonMain,
    opacity: 0.65,
    borderRadius: 4,
    height: 36,
    width: '96%'
  },
  buttonDisabled: {
    backgroundColor: Colors.buttonMainDisabled,
    borderRadius: 4,
    width: '100%',
    height: 44
  },
  buttonCancel: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: '100%',
    height: 44
  },
  buttonCancelText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff'
  },
  groupGapTop: {
    marginTop: 10
  },
  iconCheckbox: {
    width: 20,
    height: 20
  },
  buttonCancel: {
    marginTop: 8,
    backgroundColor: '#aeafaf',
    borderRadius: 4,
    width: '100%',
    height: 36
  },
  buttonCancelText: {
    marginTop: 2,
    width: '100%',
    textAlign: 'center',
    color: '#fff'
  },
};

const Globals = {
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 0,
    borderColor: 'red',
  },
  safeAreaViewGray: {
    flex: 1,
    backgroundColor: Colors.background
  },
  safeAreaViewTabBar: {
    backgroundColor: Colors.white
  },
  background: {
    height: '100%',
    backgroundColor: Colors.background
  },
  backgroundWhite: {
    height: '100%',
    backgroundColor: Colors.white
  },
  container: {
    flex: 1
  },
  iconChevron: {
    width: 9,
    height: 14,
    alignSelf: 'center'
  },
  iconChevronDisabled: {
    width: 9,
    height: 14,
    alignSelf: 'center',
    opacity: 0.5
  }
};

export { Colors, Sizes, Fonts, FormStyles, Globals };
