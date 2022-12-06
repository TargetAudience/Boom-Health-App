import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
   close: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 13,
    height: 13
  },
  bold: {
    backgroundColor: '#eee',
  },
  wrap: {
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 6
  },
  wrapInner: {
    justifyContent: 'center',
    marginHorizontal: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: hp(8),
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  removeBorder: {
    borderBottomWidth: 0
  },
  leftLabelText: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    color: '#1c1c1c'
  }
});

export default styles;
