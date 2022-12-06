import { StyleSheet, Platform } from 'react-native';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  cellContainer: {
    backgroundColor: '#fff',
    minHeight: 72
  },
  cell: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 72
  },
  cellUnread: {
    backgroundColor: 'rgba(253, 202, 64, 0.12)'
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 1
  },
  textName: {
    color: '#000000',
    flex: 1,
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
  },
  textDate: {
    marginTop: 2,
    color: '#000000',
    fontSize: Platform.OS === 'ios' ? 11.5 : normalizeFont(11.5)
  },
  textMessage: {
    color: '#000000',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginRight: 10,
    lineHeight: 18
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 6,
    justifyContent: 'flex-start'
  },
  thumbWrap: {
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  imageThumb: {
    borderRadius: 46 / 2,
    width: 46,
    height: 46,
    borderColor: '#e6e6e6',
    borderWidth: 1
  },
  imageIndicator: {
    width: 13,
    height: 13
  },
  indicator: {
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default styles;
