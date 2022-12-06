import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  rowContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacer,
    paddingVertical: 18
  },
  rowContainerB: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: '#1c1c1c',
    marginLeft: 8
  },
  iconCancel: {
    top: 2,
    width: 18,
    height: 18
  },
  subText: {
    fontSize: Platform.OS === 'ios' ? 13 : normalizeFont(13),
    color: '#1c1c1c',
    marginLeft: 5
  },
  blankStatePerson: {
    width: 80,
    height: 76
  },
  blankStateContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50
  },
  blankStateText: {
    marginTop: 16,
    fontSize: Platform.OS === 'ios' ? 16 : normalizeFont(16),
    color: '#aebed8',
    textAlign: 'center',
    paddingHorizontal: 70
  },
  checkmarkContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    height: 40
  },
  textCheckmark: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginLeft: 8,
    color: '#1c1c1c'
  },
  header: {
    width: '100%',
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    paddingTop: 22,
    paddingLeft: 20,
    color: Colors.textMain
  },
  headerNonMember: {
    paddingBottom: 6,
  },
  bottomContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 68,
    borderTopWidth: 1,
    borderColor: '#e1e4e7'
  }, 
  bottomContainerInner: {
    height: 68,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.white
  },
  button: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: width - 20,
    height: 42
  },
  buttonDisabled: {
    backgroundColor: Colors.buttonMainDisabled,
    borderRadius: 4,
    width: width - 20,
    height: 42
  },
  nonMembersEmptyContainer: {
    backgroundColor: 'white',
    paddingTop: 6,
    paddingBottom: 12,
    paddingHorizontal: 10,
  },
  nonMembersEmptyText: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginLeft: 10,
    color: '#1c1c1c'
  },
  imageIndicator: {
    width: 11,
    height: 11
  },
  imageIndicatorNonMember: {
    marginLeft: 10
  }
});

export default styles;
