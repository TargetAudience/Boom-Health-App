import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.white
  },
  background: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20
  },
  miniWrap: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 9
  },
  text: {
    color: '#fff',
    fontSize: 12,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: '700'
  }
});

export default styles;
