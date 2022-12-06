import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  containerTop: {
    backgroundColor: '#f06cb9'
  },
  containerBottom: {
    marginTop: 24,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.white
  },
  textBody: {
    marginBottom: 20,
    color: '#1c1c1c',
    fontSize: normalizeFont(14.25),
    lineHeight: 20
  },
  textBodyItalic: {
    fontStyle: 'italic'
  },
  textBodyIndent: {
    textAlign: 'right',
    fontSize: normalizeFont(13),
  },
  textBodyNoGap: {
    marginBottom: 0
  },
  profilePhoto: {
    marginTop: 1,
    borderRadius: 90 / 2,
    width: 90,
    height: 90
  },
  centerImage: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20
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
});

export default styles;
