import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    padding: 22,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 260,
  },
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  buttonContainer: {
    flex: 1,
    marginTop: 12
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5)
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
