import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 22,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 260,
  },
  scrollViewContainer: {
    overflow: 'hidden',
    height: 90
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cancelLinkContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 22
  },
  titleText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.nearBlack,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    lineHeight: 19,
    marginBottom: 20
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5)
  },
  helpText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.nearBlack,
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(13.5),
    lineHeight: Platform.OS === 'ios' ? 20 : 17
  },
  closeContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 9999
  },
  close: {
    width: 13,
    height: 13
  },
});

export default styles;
