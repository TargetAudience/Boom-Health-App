import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const { width } = Dimensions.get('screen');

const gutter = 7.5;
const widthCalc = (width - gutter * 2) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  containerB: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  actionSheetItem: {
    borderWidth: 1,
    borderColor: 'red',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#bbb9bb',
    width: '100%',
  },
  textActionSheet: {
    fontSize: 20,
    fontWeight: '400',
    color: '#0072fa',
  },
  textActionSheetCancel: {
    fontSize: 20,
    fontWeight: '400',
    color: '#ff0024',
  },
  list: {
    marginLeft: gutter,
    marginRight: gutter,
    paddingTop: 12,
    borderWidth: 0,
    borderColor: 'red',
  },
  cellContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
    paddingBottom: 10,
    width: widthCalc,
  },
  blankStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  blankStateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1c1c1c',
    textAlign: 'center',
  },
  blankStateTextB: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '300',
    color: '#1c1c1c',
    textAlign: 'center',
    paddingHorizontal: 36,
    marginBottom: 20,
  },
  imageBlankStateDocuments: {
    width: 90,
    height: 92,
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600'
  },
});

export default styles;
