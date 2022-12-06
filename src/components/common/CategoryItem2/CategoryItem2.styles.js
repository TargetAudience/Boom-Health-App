import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

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
    height: 60,
    alignItems: 'center',
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftLabelText: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginTop: 2,
    color: '#1c1c1c'
  },
  leftLabelSubText: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginTop: 2,
    color: '#1c1c1c'
  },
  labelContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default styles;
