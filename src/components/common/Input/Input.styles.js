import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    color: '#1a1b1d',
    fontSize: 15.5,
    marginLeft: 12,
    fontWeight: '400'
  },
  inputContainer: {
    marginBottom: 10
  },
  inputInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.formFieldBackground,
    height: 46,
    borderRadius: 5,
    borderColor: Colors.formFieldBorder,
    borderWidth: 1
  },
  labelStyle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    paddingBottom: 4
  }
});

export default styles;
