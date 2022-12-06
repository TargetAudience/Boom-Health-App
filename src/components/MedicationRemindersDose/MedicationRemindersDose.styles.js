import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  topGap: {
    marginTop: 24
  },
  titleText: {
    marginTop: 8
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 12,
    marginTop: 10
  },
  checkbox: {
    marginTop: 5, 
    marginBottom: 5
  },
  checkWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textCheckmark: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginLeft: 8,
    marginTop: 2,
    textAlign: 'left'
  }
});

export default styles;
