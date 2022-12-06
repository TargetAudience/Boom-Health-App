import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  containerStyle: {
    marginRight: 12
  },
  roundContainer: {
    backgroundColor: '#2a3037',
    width: 15,
    height: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -5,
    bottom: -5,
    zIndex: 99
  },
  numberText: {
    color: Colors.white,
    alignSelf: 'center',
    fontSize: 10.5,
    lineHeight: 13,
    fontWeight: '600',
    marginRight: -1,
    marginTop: 1,
    letterSpacing: -1
  },
  cartIcon: {
    width: 26,
    height: 24
  }
});

export default styles;
