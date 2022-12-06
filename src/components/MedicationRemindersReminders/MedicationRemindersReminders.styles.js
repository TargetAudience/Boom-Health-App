import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

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
  listItemContainer: {
    height: 50
  },
  scrollView: {
    marginTop: 15
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContentsContainer: {
    backgroundColor: Colors.white,
    height: 300
  },
  customMultiPickerContainer: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.listRowSpacer
  },
  modalHeaderContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between'
  },
  modalHeaderText: {
    width: '60%',
    color: '#000',
    fontSize: 16,
    letterSpacing: -0.1,
    textAlign: 'center'
  },
  rightButtonContainer: {
    width: '20%',
  },
  rightButtonText: {
    color: Colors.orange,
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'right'
  },
  leftButtonText: {
    width: '20%'
  },
  listItemTitle: {
    marginTop: 20,
    marginBottom: 6,
    color: '#5c5c5c',
    fontSize: 12,
    marginLeft: 20,
    letterSpacing: -0.1
  }
});

export default styles;
