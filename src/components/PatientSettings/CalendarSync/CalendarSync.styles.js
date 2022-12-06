import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  formContainer: {
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacer
  },
  text: {
    fontSize: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    textAlign: 'center'
  },
  textLast: {
    marginBottom: 0
  },
  buttonContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#8795a8',
    borderRadius: 3,
    padding: 8,
    marginTop: 20,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 13,
    letterSpacing: -0.15
  },
  inputContainer: {
    marginTop: 20
  }
})

export default styles;
