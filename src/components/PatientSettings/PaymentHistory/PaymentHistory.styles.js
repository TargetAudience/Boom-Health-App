import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  blankStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  blankStateText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#9fa1a7',
    textAlign: 'center',
  },
  dateTimeIcon: {
    width: 72,
    height: 72,
    marginBottom: 20
  },
  textContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacer
  },
  requestedOnText: {
    marginTop: 12,
    marginBottom: 14,
    color: Colors.black,
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    fontWeight: '700'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4
  },
  messageText: {
    marginTop: 12,
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.black,
    fontWeight: '300'
  },
  iconCalendar: {
    width: 25,
    height: 25,
    marginRight: 3,
    marginTop: 1
  },
  iconText: {
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 3,
    marginLeft: 6,
    marginRight: 12,
    lineHeight: 20,
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.black
  },
  iconNoteContainer: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  iconNote: {
    width: 25,
    height: 25,
    marginRight: 3,
    marginTop: 1
  }
});

export default styles;
