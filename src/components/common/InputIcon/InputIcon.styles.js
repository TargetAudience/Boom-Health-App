import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/GlobalStyles';

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    color: '#1a1b1d',
    fontSize: 15.5,
    marginLeft: 3,
    fontWeight: '400'
  },
  inputInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.formFieldBackground,
    height: 46,
    borderRadius: 5,
    borderColor: Colors.formFieldBorder,
    borderWidth: 1
  },
  eyeIcon: {
    height: 25,
    width: 25,
    margin: 10,
    marginRight: 7
  }
});

export default styles;
