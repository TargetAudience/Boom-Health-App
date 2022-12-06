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
  gap: {
    marginTop: 12
  },
  miniSpacer: {
    height: 8
  },
  buttonContainer: {
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
  buttonTextDisabled: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: Colors.buttonDisabledText
  },
  entryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    paddingBottom: 12,
    textAlign: 'left'
  },
  textCostSummarySubText: {
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
    paddingBottom: 2,
    textAlign: 'left'
  },
  gapTop: {
    marginTop: 4
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5
  },
  textCheckmark: {
    fontSize: 14,
    marginLeft: 12,
    lineHeight: 19,
    textAlign: 'left',
    fontWeight: '500'
  },
  cardTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    flex: 1
  },
  cardsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 18
  },
  textCardText: {
    lineHeight: 19,
    paddingLeft: 10,
    fontSize: 13.5,
    color: '#1c1c1c',
    fontWeight: '500'
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
  buttonSignIn: {
    backgroundColor: Colors.buttonBlue,
    borderRadius: 4,
    marginTop: 2,
    width: '100%',
    height: 40
  },
  addCardButtonContainer: {
    marginTop: 12
  },
  buttonTextAdd: {
    marginTop: 1,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600'
  },
  summaryBottomLineB: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8'
  },
  iconNoteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  iconWorker: {
    width: 25,
    height: 24,
    marginRight: 3,
    marginTop: 1
  },
  iconText: {
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 6,
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    color: Colors.black
  },
});

export default styles;
