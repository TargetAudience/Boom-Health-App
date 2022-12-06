import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  modalBackground: {
    width,
    height,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Colors.blackTransparent
  }
});

export default styles;
