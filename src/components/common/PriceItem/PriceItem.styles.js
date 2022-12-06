import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

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
    fontSize: 14.5,
    marginTop: 2,
    color: '#1c1c1c',
    fontWeight: '600'
  },
  leftLabelSubText: {
    fontSize: 14,
    marginTop: 2,
    color: '#1c1c1c',
    fontWeight: '300'
  },
  lablelContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
  },
  rightPriceLabelText: {
    fontSize: 14,
    marginTop: 2,
    marginRight: 10,
    color: '#1c1c1c',
    fontWeight: '600'
  }
});

export default styles;
