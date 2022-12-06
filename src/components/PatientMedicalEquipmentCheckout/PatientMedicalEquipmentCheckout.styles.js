import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerB: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  textInput: {
    textAlign: 'left',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.listRowSpacer,
    borderRadius: 5,
    backgroundColor: '#f2f4f8',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    height: 100,
    textAlignVertical: 'top'
  },  
  selectTimeText: {
    marginTop: 15,
    marginBottom: 6,
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.black
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    paddingLeft: 13
  },
  calendarWhite: {
    width: 17,
    height: 17,
    marginRight: 10,
    marginTop: 1
  },
  openText: {
    alignSelf: 'center',
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    color: '#fff'
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
  timeDateText: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5)
  },
  deliveryOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  deliveryInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  textCheckmark: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginLeft: 12,
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    textAlign: 'left'
  },
  textCheckmark2: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginLeft: 12,
    marginTop: 2,
    textAlign: 'left'
  },
  numCharacters: {
    textAlign: 'right',
    fontSize: Platform.OS === 'ios' ? 13 : normalizeFont(13),
  }
});

export default styles;
