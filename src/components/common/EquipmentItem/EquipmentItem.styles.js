import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacer,
  },
  thumbnail: {
    marginRight: 12,
  },
  imageThumb: {
    width: 73,
    height: 60,
  },
  detail: {
    flex: 1,
  },
  name: {
    textAlign: 'left',
    color: '#000',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14)
  },
});

export default styles;
