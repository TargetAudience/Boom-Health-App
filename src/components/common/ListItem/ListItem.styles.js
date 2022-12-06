import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacer
  },
  paddingRemove: {
    paddingHorizontal: 0
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  mainText: {
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14)
  },
  mainTextDisabled: {
    color: '#bbb'
  },
  selectionText: {
    color: Colors.black,
    marginRight: 16,
    fontSize: Platform.OS === 'ios' ? 13 : normalizeFont(13),
    letterSpacing: 0.10
  }
});

export default styles;
