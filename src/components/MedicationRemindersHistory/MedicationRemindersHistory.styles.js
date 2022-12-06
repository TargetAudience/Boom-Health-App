import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  scrollView: {
    marginBottom: 68
  },
  column: { 
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'flex-start' 
  },
  containerB: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 14
  },
  bottomContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 68,
    borderTopWidth: 1,
    borderColor: '#e1e4e7'
  },
  bottomContainerInner: {
    height: 68,
    alignSelf: 'center',
    justifyContent: 'center'
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
  cellContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#e1e4e7'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer2: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    color: '#1c1c1c'
  },
  textMedicine: {
    fontSize: Platform.OS === 'ios' ? 15.5 : normalizeFont(14.5),
    marginTop: 9,
    marginBottom: 6,
    color: '#1c1c1c'
  },
  textDose: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    color: '#1c1c1c'
  },
  textDate: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    color: '#1c1c1c'
  },
  textTaken: {
    fontSize: 12.5,
    color: '#1db620'
  },
  textSkipped: {
    fontSize: 12.5,
    color: '#e45846'
  },
  checkboxGreen: {
    width: 16,
    height: 16,
    marginRight: 6
  },
  checkmarkRed: {
    width: 16,
    height: 16,
    marginRight: 6
  },
  checkboxContainer: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    backgroundColor: Colors.white
  },
  bottomContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 68,
    borderTopWidth: 1,
    borderColor: '#e1e4e7'
  },
  bottomContainerInner: {
    height: 68,
    alignSelf: 'center',
    justifyContent: 'center'
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
