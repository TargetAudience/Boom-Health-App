import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    height: 100
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 15
  },
  addAddressContainer: {
    marginTop: 12
  },
  buttonText: {
    marginTop: 2,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600'
  },
  buttonTextAdd: {
    marginTop: 1,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600'
  },
  entryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  deliveryOuter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textBold: {
    color: '#000',
    fontWeight: '600'
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
    fontSize: 14.5,
    paddingBottom: 12,
    textAlign: 'left',
    fontWeight: '600'
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
    fontSize: 14.5,
    paddingBottom: 12,
    textAlign: 'left',
    fontWeight: '600'
  },
  textDelivery2: {
    fontSize: 14.5,
    paddingBottom: 12,
    lineHeight: 19,
    textAlign: 'left',
    fontWeight: '400'
  },
  deliveryInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  textCheckmark: {
    fontSize: 14,
    marginLeft: 12,
    marginTop: 2,
    textAlign: 'left',
    fontWeight: '500'
  },
  textCheckmark2: {
    fontSize: 14,
    marginLeft: 12,
    marginTop: 2,
    textAlign: 'left',
    fontWeight: '400'
  },
  leftLabelText: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 12,
    color: '#1c1c1c',
    fontWeight: '600'
  },
  leftLabelTextAddress: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 12,
    color: '#4c4c4c',
    fontWeight: '400'
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.buttonMain
  },
  buttonTextEdit: {
    textAlign: 'center',
    color: Colors.greenText,
    fontSize: 13.5,
    fontWeight: '500'
  },
  rowContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center'
  },
  rowInner: {
    flexDirection: 'row',
  },
   removeContainer: {
    alignItems: 'center',
    marginLeft: 20,
    justifyContent: 'center',
  },
  cancel: {
    width: 20,
    height: 20
  },
  buttonEdit: {
    borderWidth: 1,
    borderColor: Colors.buttonMain
  },
  buttonEditText: {
    textAlign: 'center',
    color: Colors.greenText,
    fontSize: 13.5,
    fontWeight: '500'
  },
  numCharacters: {
    textAlign: 'right',
    fontSize: 13
  },
  head: { height: 40, backgroundColor: Colors.backgroundBlue },
  text: { margin: 6, color: 'white', fontSize: 13.5, fontWeight: '600', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  textBody: { margin: 6, fontSize: 13.5, fontWeight: '600', alignItems: 'center', justifyContent: 'center', textAlign: 'center', }
});

export default styles;
