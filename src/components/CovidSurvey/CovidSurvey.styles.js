import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { hasNotch } from '@freakycoder/react-native-helpers';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    marginBottom: hasNotch() ? 54 : 72
  },
  bodyContainer: {
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  questionText: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14),
    color: '#1c1c1c'
  },
  checkmarkContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20
  },
  answerText: {
    marginTop: 4,
    fontSize: Platform.OS === 'ios' ? 11.5 : normalizeFont(11.5),
    color: '#1c1c1c',
    textAlign: 'center'
  },
  bottomContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: hasNotch() ? 88 : 72,
    borderTopWidth: 1,
    borderColor: '#e1e4e7'
  },
  bottomContainerInner: {
    marginTop: hasNotch() ? 12 : 0,
    height: hasNotch() ? 0 : 68,
    alignSelf: 'center',
    justifyContent: hasNotch() ? '' : 'center',
    borderWidth: 0,
    borderColor: 'green'
  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.white
  },
  button: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: width - 20,
    height: 42
  },
  textIntro: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.25),
    lineHeight: 19
  },
  textIntroBold: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.25),
    lineHeight: 19
  },
  textIntroGapBottom: {
    marginTop: 10,
    marginBottom: 20
  },
  introContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.white
  }
});

export default styles;
