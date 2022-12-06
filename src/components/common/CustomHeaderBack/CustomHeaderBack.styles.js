import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  close: {
    marginRight: 10,
    width: 16,
    height: 16
  },
  viewLeft: {
    flex: 1
  },
  viewRight: {
    flex: 1,
    alignItems: 'flex-end'
  },
  viewRightB: {
    flex: 1,
    alignItems: 'flex-end',
  },
  loaderContainerB: {
    position: 'absolute',
    top: 0,
    right: 36
  },
  loaderContainerC: {
    position: 'absolute',
    top: -12,
    right: 0,
  },
  customRightTextB: {
    paddingTop: 1,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15),
    textAlign: 'center',
    alignItems: 'center',
    color: Colors.textMain,
    marginRight: 14
  },
  viewMiddle: {
    width: '54%',
    borderWidth: 0,
    borderColor: 'red'
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#e3e3e3',
    zIndex: 9,

  },
  arrowContainer: {
    justifyContent: 'center'
  },
  arrowBack: {
    marginLeft: 10,
    width: 20,
    height: 16
  },
  titleText: {
    textAlign: 'center',
    alignItems: 'center',
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 16 : normalizeFont(16),
    lineHeight: 19
  },
  titleTextSmall: {
    textAlign: 'center',
    alignItems: 'center',
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 15.5 : normalizeFont(15.5),
    lineHeight: 21
  },
  customRightText: {
    fontSize: Platform.OS === 'ios' ? 15.5 : normalizeFont(15),
    textAlign: 'center',
    alignItems: 'center',
    color: Colors.textMain,
    marginRight: 14
  },
  logo: {
    alignSelf: 'center',
    width: 70,
    height: 56
  },
  iconEllipsis: {
    width: 20,
    height: 20,
    marginRight: 12
  },
  iconSettings: {
    width: 21,
    height: 21,
    marginRight: 12
  },
  feedback: {
    width: 26,
    height: 21,
    marginRight: 20
  },
  loaderContainer: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
    alignItems: 'flex-end',
    height: 60,
    justifyContent: 'center'
  },
  loaderInner: {
    width: 60
  }
});

export default styles;
