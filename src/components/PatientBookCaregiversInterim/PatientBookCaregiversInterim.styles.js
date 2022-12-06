import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: Colors.white
  },
  introContainer: {
    paddingBottom: 20,
    backgroundColor: Colors.white,
    paddingLeft: 22
  },
  textIntro: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    lineHeight: 19
  },
  buttonBackground: {
    paddingBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#f06cb9',
    width: width - 40,
    paddingBottom: 18,
    paddingTop: 18,
    paddingLeft: 26,
    paddingRight: 24,
    borderRadius: 12,

  },
  buttonAlign: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  buttonTextTop: {
    fontSize: Platform.OS === 'ios' ? 16.5 : normalizeFont(15.5),
    color: Colors.white
  },
  buttonText: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(13),
    color: Colors.white
  },
  buttonContainerInner: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightArrowImageContainer: {
    position: 'absolute',
    right: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightArrowImage: {
    width: 28,
    height: 15
  },
  firstMask: {
    position: 'absolute',
    right: 20,
    top: -5,
    bottom: 0,
    width: 128,
    height: 112
  },
  secondMask: {
    position: 'absolute',
    right: 25,
    top: -2,
    bottom: 0,
    width: 106,
    height: 106
  },
  maskBackground: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  maskContainer: {
    backgroundColor: '#f06cb9',
    width: width - 40,
    borderRadius: 12,
    height: '100%'
  }
});

export default styles;
