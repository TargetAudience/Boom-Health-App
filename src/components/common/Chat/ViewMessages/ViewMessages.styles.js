import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  containerB: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  containerList: {
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  listView: {
    justifyContent: 'flex-start'
  },
  imageTrash: {
    alignSelf: 'center',
    width: 30,
    height: 30
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: 60,
    backgroundColor: 'blue'
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#eef3f6',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#eef3f6',
    right: 0,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e7e7e7'
  },
  blankStateMessages: {
    width: 72,
    height: 72,
    marginBottom: 20
  },
  blankStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  blankStateText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#9fa1a7',
    textAlign: 'center',
  }
});

export default styles;
