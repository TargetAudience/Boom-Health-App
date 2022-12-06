import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pdf: {
    flex: 1,
    width,
    height
  },
  buttonsContainer: {
    borderWidth: 0,
    borderColor: 'green',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textButton: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 14.5,
    fontWeight: '600',
  },
  containerNoDisplay: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%'
  },
  textNoDisplay: {
    marginTop: 22,
    paddingHorizontal: 20,
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    fontWeight: '400',
    color: '#1c1c1c'
  },
});

export default styles;
