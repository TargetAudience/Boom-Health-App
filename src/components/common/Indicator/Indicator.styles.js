import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 10,
    height: 20
  },
  large: {
    width: 26
  },
  regular: {
    width: 20
  },
  largeSm: {
    width: 20,
    paddingLeft: 1
  },
  regularSm: {
    width: 14,
    paddingLeft: 1
  },
  numberText: {
    color: Colors.white,
    alignSelf: 'center',
    fontSize: normalizeFont(13),
    lineHeight: 19,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
  }
});

export default styles;
