import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  scrollView: {
    marginBottom: 68
  },
  textInput: {
    textAlign: 'left',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.listRowSpacer,
    borderRadius: 5,
    backgroundColor: '#f2f5fa',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    height: 120,
    textAlignVertical: 'top'
  },
  numCharacters: {
    textAlign: 'right',
    fontSize: Platform.OS === 'ios' ? 13 : normalizeFont(13),
    marginHorizontal: 10,
    marginBottom: 20
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacer
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
    color: '#fff'
  },
});

export default styles;