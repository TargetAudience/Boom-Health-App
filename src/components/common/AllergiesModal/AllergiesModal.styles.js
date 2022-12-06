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
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    lineHeight: 19,
    marginBottom: 20
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
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
  instructionsText: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    color: Colors.nearBlack,
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 12
  },
  checkbox: {
    marginTop: 5, 
    marginBottom: 5
  },
  deliveryContainer: {
    marginBottom: 12,
  },
  deliveryInner: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textCheckmark: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginLeft: 8,
    marginTop: 2,
    textAlign: 'left'
  }
});

export default styles;
