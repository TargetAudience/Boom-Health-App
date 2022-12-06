import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tabs: {
    flex: 1,
    height: 54,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e3e3e3'
  },
  messagesContainer: {
    flexDirection: 'row'
  },
  indicator: {
    position: 'absolute',
    top: -3
  },
  thumb: {
    height: 31,
    width: 31,
    borderRadius: 15
  },
  thumbPlaceholder: {
    height: 31,
    width: 31,
    borderRadius: 15
  },
  profilePhotoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 18,
    borderWidth: 3,
    marginTop: -1,
    overflow: 'hidden'
  },
  tabActive: {
    borderColor: Colors.buttonMain
  },
  tabInactive: {
    borderWidth: 0
  },
  placeholderActive: {
    borderColor: Colors.buttonMain
  },
  placeholderInactive: {
    borderWidth: 0
  },
  tabContainter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 1,
  },
  textOff: {
    fontWeight: '500',
    color: '#3f4956',
    fontSize: 9.5,
    marginTop: 3,
    textAlign: 'center'
  },
  textOn: {
    fontWeight: '500',
    color: '#ff49b8',
    fontSize: 9.5,
    marginTop: 3,
    textAlign: 'center'
  },
});

export default styles;
