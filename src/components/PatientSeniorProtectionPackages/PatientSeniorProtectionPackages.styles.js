import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, 
    backgroundColor: Colors.backgroundColor
  },
  textInput: {
    textAlign: 'left',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.listRowSpacer,
    borderRadius: 5,
    backgroundColor: '#f2f5fa',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    height: 100,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 15
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff'
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
  deliveryContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 18
  },
  deliveryBottomLine: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  textDelivery: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    paddingBottom: 12,
    textAlign: 'left'
  },
  numCharacters: {
    textAlign: 'right',
    fontSize: Platform.OS === 'ios' ? 13 : normalizeFont(13.5),
  },
  rowContainer: {
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: 2.0,
  },
  pink: {
    backgroundColor: '#ffe9f6',
    borderColor: '#ffc9ea'
  },
  grey: {
    backgroundColor: '#f6f5f5',
    borderColor: '#f6f5f5'
  },
  rowInner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  planTextHeading: {
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15),
    paddingBottom: 12,
    textAlign: 'left'
  },
  planText: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginBottom: 12,
    textAlign: 'left'
  },
  planTextNumber: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    textAlign: 'left'
  },
  rowPayment: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1
  },
  topLine: {
    borderTopWidth: 1.5,
    paddingTop: 10,
  },
  pinkLine: {
    borderColor: '#fec0e6',
  },
  greyLine: {
    borderColor: '#dadada',
  },
  contentContainer: {
    marginLeft: 16,
    flex: 1
  },
  planBulletText: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginBottom: 6,
    textAlign: 'left',
    marginLeft: 42
  },
  bulletContainer: {
    marginTop: 12
  }
});

export default styles;
