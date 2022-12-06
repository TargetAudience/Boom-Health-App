import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacer
  },
  noteContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 18,
    marginTop: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacer
  },
  requestedOnText: {
    marginTop: 12,
    marginBottom: 14,
    color: Colors.black,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15)
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4
  },
  messageText: {
    marginTop: 12,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15),
    color: Colors.black
  },
  messageText2: {
    marginTop: 6,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15),
    color: Colors.black
  },
  textCancel: {
    marginTop: 12,
    marginHorizontal: 30,
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    lineHeight: 17,
    color: Colors.black,
    textAlign: 'center'
  },
  iconCalendar: {
    width: 25,
    height: 25,
    marginRight: 5,
    marginTop: 1
  },
  iconText: {
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 6,
    marginRight: 20,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15),
    color: Colors.black
  },
  iconNoteContainer: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  iconNote: {
    width: 27,
    height: 27,
    marginRight: 3,
    marginTop: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.white
  },
  button: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: 200,
    height: 38
  },
  topGap: {
    marginTop: 20,
    marginBottom: 20
  },
  instructionsText: {
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15),
    color: '#1c1c1c',
    lineHeight: 18,
    textAlign: 'left',
    marginBottom: 16
  },
  instructionsStarsText: {
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15),
    color: '#1c1c1c',
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 8
  },
  starContainer: {
    marginBottom: 16,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  semiBold: {
    fontWeight: '500'
  },
  ratingContainer: {
    flexDirection: 'row'
  },
  cancelText: {
    color: '#1c1c1c',
    lineHeight: 20,
    textAlign: 'left',
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15)
  }
});

export default styles;