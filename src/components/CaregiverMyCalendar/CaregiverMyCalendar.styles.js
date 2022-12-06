import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
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
    fontSize: normalizeFont(16),
    paddingTop: hp(2),
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  dateHeadingSubText: {
    paddingTop: Platform.OS === 'ios' ? 3 : hp(0.4),
    paddingBottom: 12,
    color: '#a8aeb7',
    fontSize: normalizeFont(13),
    paddingHorizontal: 15,
    backgroundColor: 'white',
    textTransform: 'uppercase'
  },
  blankStateContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 100,
    paddingHorizontal: 40
  },
  blankStateText: {
    marginTop: 16,
    fontSize: normalizeFont(14.5),
    color: '#aebed8',
    textAlign: 'center',
  }
});

export default styles;