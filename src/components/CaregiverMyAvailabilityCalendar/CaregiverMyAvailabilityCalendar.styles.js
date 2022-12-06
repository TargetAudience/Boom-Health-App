import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 16,
    marginRight: 16
  },
  nonTabContainerIndent: {
    flexDirection: 'column',
    marginBottom: 16
  },
  adjustCheckmark: {
    marginTop: 1
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  calendar: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.hardHairline
  },
  rowContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 74,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacer
  },
  colName: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  rowLeft: {
    flexDirection: 'row'
  },
  rowRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chatIcon: {
    width: 20,
    height: 20,
    marginTop: 3,
    marginLeft: 12
  },
  dateHeadingText: {
    color: Colors.black,
    fontSize: 19,
    paddingTop: 20,
    paddingHorizontal: 15,
    letterSpacing: 0.1,
    backgroundColor: 'white',
    fontWeight: '700'
  },
  dateHeadingSubText: {
    paddingTop: 4,
    paddingBottom: 12,
    color: '#a8aeb7',
    fontSize: 13.5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    textTransform: 'uppercase',
    fontWeight: '500'
  },
  nameText: {
    fontSize: 15,
    color: Colors.black,
    letterSpacing: -0.1,
    paddingBottom: 2
  },
  shiftTimeText: {
    fontSize: 13,
    color: Colors.subText,
    letterSpacing: 0.1
  },
  officeContainer: {
    marginTop: 4,
    flexDirection: 'column'
  },
  locationText: {
    fontSize: 13.5,
    color: Colors.mainText,
    letterSpacing: 0.1
  },
  officeText: {
    fontSize: 13.5,
    color: Colors.blue,
    letterSpacing: 0.1,
    textAlign: 'right'
  },
  filterIndicator: {
    position: 'absolute',
    zIndex: 9,
    right: 0,
    top: -4
  },
  blankStateSchedule: {
    width: 80,
    height: 76
  },
  blankStateContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 6,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5
  },
  blankStateText: {
    fontSize: 15,
    color: '#1c1c1c',
    textAlign: 'center',
  },
  dateTimeIcon: {
    width: 28,
    height: 28,
    marginBottom: 8
  },
  phoneIcon: {
    width: 21,
    height: 21,
    marginLeft: -9,
    marginTop: -1
  },
  phoneContainer: {
    flexDirection: 'row'
  },
  lineTop: {
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.listRowSpacer,
    marginLeft: 55
  },
  listContainer: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.listRowSpacer
  },
  listContainer2: {
    paddingTop: 0,
    paddingBottom: 30,
  },
  notAvailabileText: {
    paddingTop: 4,
    marginBottom: 4,
    color: '#1c1c1c',
    fontSize: 13.5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  defaultAvailabilityText: {
    paddingTop: 4,
    marginBottom: 4,
    color: '#1c1c1c',
    fontSize: 13.5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  defaultAvailabilityText2: {
    fontSize: 13.5,
    fontWeight: '300'
  },
  defaultAvailabilityText3: {
    color: '#1c1c1c',
    fontSize: 13.5,
    paddingHorizontal: 15,
    fontWeight: '300',
    marginBottom: 2
  },
  bottomButtonContainer: {
    paddingTop: 6,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginLeft: 40
  },
  buttonText: {
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 14.5,
    fontWeight: '500'
  },
  overrideText: {
    paddingTop: 2,
    color: '#1c1c1c',
    fontSize: 13.5,
    paddingHorizontal: 15,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  overrideText2: {
    paddingTop: 4,
    paddingBottom: 12,
    color: '#1c1c1c',
    fontSize: 14.5,
    paddingHorizontal: 15,
    fontWeight: '300',
  },
  strikeThrough: {
    textDecorationLine: 'line-through'
  }
});

export default styles;