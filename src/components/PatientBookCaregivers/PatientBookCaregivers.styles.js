import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { hasNotch } from '@freakycoder/react-native-helpers';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerFlatList: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  bottomFooterSpace: {
    backgroundColor: 'white',
    height: 10
  },
  checkmarkContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    height: Platform.OS === 'ios' ? 40 : 36,
  },
  textCheckmark: {
    alignSelf: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    marginLeft: 10,
    color: '#1c1c1c'
  },
  textIntro: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: Colors.white
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
  header: {
    width: '100%',
    backgroundColor: '#f4f4f4',
    alignSelf: 'flex-start',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    paddingTop: hp(1.8),
    paddingBottom: hp(1.8),
    paddingLeft: 20,
    color: Colors.nearBlack,
    fontWeight: '600'
  }
});

export default styles;
