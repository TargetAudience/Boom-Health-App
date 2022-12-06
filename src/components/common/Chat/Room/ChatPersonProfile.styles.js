import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: 78,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dfe4e9', 
  },
  row: {
    flexDirection: 'row',
    marginBottom: 1
  },
  textName: {
    marginTop: 2,
    color: '#000000',
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15),
    lineHeight: 18
  },
  textMembersCount: {
    marginTop: Platform.OS === 'ios' ? 1 : 0,
    color: '#000000',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    lineHeight: 18
  },
  textEllipsis: {
    color: Colors.darkGrayButton,
    fontSize: 24,
    marginBottom: 1,
    lineHeight: 15,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 12,
    justifyContent: 'flex-start'
  },
  thumbWrap: {
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  imageThumb: {
    borderRadius: 54 / 2,
    width: 54,
    height: 54,
    borderColor: '#e6e6e6',
    borderWidth: 1
  },
  whiteNotch: {
    position: 'absolute',
    bottom: -10,
    width: 24,
    height: 10,
  },
  imageIndicatorView: {
    position: 'absolute',
    top: 1,
    right: 1
  },
  imageIndicator: {
    width: 14,
    height: 14
  },
});

export default styles;
