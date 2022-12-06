import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#f06cb9',
    marginHorizontal: 0,
    padding: 22,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 260,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  closeContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 9999
  },
  close: {
    width: 13,
    height: 13
  },
  profilePhoto: {
    marginTop: 1,
    borderRadius: 90 / 2,
    width: 90,
    height: 90
  },
  iconClosePink: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 18,
    height: 18
  },
  heartsImage: {
    width: 41,
    height: 29,
    marginBottom: 22
  },
  lisasStoryScriptImage: {
    width: 149,
    height: 34,
    marginTop: 22
  },
  textStoryIntro: {
    textAlign: 'center',
    marginTop: 8,
    color: '#fff',
    fontSize: normalizeFont(13),
    marginTop: 10
  },
  textStoryBody: {
    textAlign: 'center',
    marginTop: 6,
    color: '#fff',
    fontSize: normalizeFont(13),
    marginBottom: 18
  },
  buttonReadMoreText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    color: '#fff',
    fontSize: normalizeFont(11.25),
    marginRight: 10,
    marginLeft: 10,
    letterSpacing: -0.3,
    textTransform: 'uppercase'
  },
  buttonReadMore: {
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: '#fff'
  }
});

export default styles;
