import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  formWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 15,
    marginTop: 20
  },
  scrollView: {
    marginBottom: 68
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
  spacer: {
    width: '100%',
    height: 16,
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  listItemContainer: {
    height: 50
  },
  selectionMedication: {
    width: 24,
    height: 24,
    marginRight: 15
  }
});

export default styles;
