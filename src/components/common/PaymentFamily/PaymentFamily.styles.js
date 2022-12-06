import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  gap: {
    marginTop: 12
  },
  textBold: {
    color: '#000'
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
  },
  checkmarkContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  checkmarkRemoveGap: {
    marginBottom: 0
  },
  textCheckmark: {
    alignSelf: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginTop: 2,
    marginLeft: 10,
    color: '#1c1c1c'
  },
  textPurchaseNotice: {
    textAlign: 'left',
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
    marginTop: 10,
    lineHeight: 17,
    color: '#1c1c1c'
  }
});

export default styles;
