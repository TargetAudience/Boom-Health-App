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
  rowInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: Colors.darkGrayButton,
    borderRadius: 8,
    padding: 8
  },
  paddingRemove: {
    paddingHorizontal: 0
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  mainText: {
    marginLeft: 12,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14)
  },
  selectionTextContainer: {
    marginRight: 16,
    paddingHorizontal: 8,
  },
  selectionText: {
    color: Colors.black,
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(13),
    letterSpacing: 0.1,
  }
});

export default styles;
