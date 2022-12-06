import { StyleSheet, Platform } from 'react-native';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  gap: {
    marginTop: 12
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
  textPurchaseNotice: {
    textAlign: 'left',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginTop: 0,
    lineHeight: 17,
    color: '#1c1c1c'
  }
});

export default styles;
