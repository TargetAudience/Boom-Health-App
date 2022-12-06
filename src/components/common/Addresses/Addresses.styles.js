import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  addressContainer: {
    backgroundColor: '#fff',
  },
  addAddressContainer: {
    marginTop: 12
  },
  buttonTextAdd: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    width: '100%',
    textAlign: 'center',
    color: '#fff'
  },
   rowContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center'
  },
  rowInner: {
    flexDirection: 'row',
  },
  leftLabelText: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginTop: 4,
    marginLeft: 12,
    color: '#1c1c1c'
  },
  leftLabelTextAddress: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginTop: Platform.OS === 'ios' ? 4 :0,
    marginLeft: 12,
    color: '#4c4c4c',
  },
  removeContainer: {
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'center',
  },
  cancel: {
    width: 20,
    height: 20
  },
  buttonEdit: {
    borderWidth: 1,
    borderColor: Colors.buttonMain
  },
  buttonEditText: {
    textAlign: 'center',
    color: Colors.buttonMain,
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5)
  },
  deliveryOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deliveryInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  }
});

export default styles;
