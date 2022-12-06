import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, 
    backgroundColor: Colors.backgroundColor
  },
  gap: {
    marginTop: 12
  },
  textCostSummary: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    paddingBottom: 12,
    textAlign: 'left'
  },
  cardTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 0,
    flex: 1
  },
  textCardText: {
    lineHeight: 19,
    paddingLeft: 10,
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
    color: '#1c1c1c'
  },
  cardTypeWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  invitesContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  invitesInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
    alignItems: 'center'
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
  addCardButtonContainer: {
    marginTop: 12
  },
  buttonTextAdd: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    width: '100%',
    textAlign: 'center',
    color: '#fff'
  },
  textAlert: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    paddingBottom: 12,
    textAlign: 'left'
  },
  alertIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginTop: -2
  },
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
});

export default styles;
