import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  textUpsell: {
    marginTop: 12,
    marginHorizontal: 30,
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    color: Colors.black,
    textAlign: 'center',
    lineHeight: 18
  },
  buttonUpsellContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12
  },
  buttonUpsellText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.white
  }
});

export default styles;
