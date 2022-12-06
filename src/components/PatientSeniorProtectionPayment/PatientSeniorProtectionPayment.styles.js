import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white 
  },
  scrollView: {
    flex: 1, 
    backgroundColor: Colors.mainBackground
  },
  buttonContainer: {
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 15
  },  
  miniSpacer: {
    height: 8
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff'
  },
  buttonTextDisabled: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: Colors.buttonDisabledText
  },
  entryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  summaryContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 18
  },
  summaryBottomLine: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  textCostSummary: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    paddingBottom: 12,
    textAlign: 'left'
  }
});

export default styles;
