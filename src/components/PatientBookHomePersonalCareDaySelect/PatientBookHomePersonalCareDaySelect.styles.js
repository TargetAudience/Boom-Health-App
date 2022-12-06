import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  calendar: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.hardHairline
  },
  blankStateSchedule: {
    width: 80,
    height: 76
  },
  blankStateContainer: {
    backgroundColor: Colors.white,
    minHeight: 180
  },
  blankStateText: {
    marginTop: 26,
    fontSize: 16,
    lineHeight: 21,
    color: '#aebed8',
    textAlign: 'center',
  },
  renderItemsContainer: {
    backgroundColor: '#fff',
    minHeight: 180,
    paddingBottom: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.listRowSpacer
  },
  loaderListContainer: {
    backgroundColor: '#fff',
    minHeight: 180
  },
  timeItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacer
  },
  timeText: {
    fontSize: 14.5,
    color: '#000',
    fontWeight: '500'
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
  listContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.listRowSpacer
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
  phoneIcon: {
    width: 21,
    height: 21,
    marginLeft: -9,
    marginTop: -1
  },
  phoneContainer: {
    flexDirection: 'row'
  }
});

export default styles;