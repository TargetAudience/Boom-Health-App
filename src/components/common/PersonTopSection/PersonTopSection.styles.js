import { StyleSheet } from 'react-native';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderWidth: 0,
    borderColor: 'red'
  },
  sectionHeadingText: {
    textTransform: 'uppercase',
    marginTop: 2,
    color: '#1c1c1c',
    fontSize: normalizeFont(13.25),
    marginRight: 6,
    letterSpacing: -0.3,
  },
  heartsImage: {
    width: 32,
    height: 23,
  },
  heartInner: {
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row'
  },
});

export default styles;
