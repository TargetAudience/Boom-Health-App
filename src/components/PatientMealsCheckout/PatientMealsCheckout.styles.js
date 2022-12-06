import {StyleSheet, Dimensions, Platform} from 'react-native';
import {Colors} from '@constants/GlobalStyles';
import {normalizeFont} from '@utils/Responsive';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerB: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  checkMarkContainerB: {
    marginTop: 10,
    flexDirection: 'row',
    marginLeft: 16,
    alignItems: 'flex-start',
  },
  deliveryOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  textCheckmark: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginLeft: 12,
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    textAlign: 'left',
  },
  textCheckmark2: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginLeft: 12,
    marginTop: 2,
    textAlign: 'left',
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
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  timeDeliveryWindowContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bullet: {
    width: 10,
    height: 10,
  },
  timeDeliveryWindow: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.black,
    paddingLeft: 4,
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    paddingLeft: 13,
  },
  calendarWhite: {
    width: 17,
    height: 17,
    marginRight: 10,
    marginTop: 1,
  },
  midButtonText: {
    alignSelf: 'center',
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    color: '#fff',
  },
  deliveryDateText: {
    marginBottom: 10,
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.black,
  },
  deliveryDateTextGap: {
    marginTop: 10,
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  summaryBottomLine: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textSectionTitle: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    paddingBottom: 12,
    textAlign: 'left',
  },
  deliveryContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 18,
  },
  deliveryBottomLine: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textDelivery: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    paddingBottom: 12,
    textAlign: 'left',
  },
  numCharacters: {
    textAlign: 'right',
    fontSize: Platform.OS === 'ios' ? 13 : normalizeFont(13),
  },
});

export default styles;
