import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  rowContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: Platform.OS === 'ios' ? 64 : hp(9),
    alignItems: 'center',
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftLabelText: {
    fontSize: normalizeFont(14),
    marginTop: 2,
    color: '#1c1c1c'
  },
  leftLabelSubText: {
    fontSize: normalizeFont(14),
    marginTop: Platform.OS === 'ios' ? 3 : hp(0.2),
    color: '#1c1c1c'
  },
  lablelContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  addTopLine: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.listRowSpacer
  }
});

export default styles;
