import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  scrollView: {
    marginBottom: 68
  },
  titleText: {
    marginTop: 24
  },
  topGap: {
    marginTop: 24
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 12,
    marginTop: 10
  },
  column: { 
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'flex-start' 
  },
  containerB: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 14
  },
  rowContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    alignItems: 'center',
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftLabelText: {
    flex: 1,
    alignSelf: 'center',
    color: '#1c1c1c'
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
  button: {
    marginTop: 3
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
  },
  checkbox: {
    marginTop: 5, 
    marginBottom: 5
  },
  checkWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textCheckmark: {
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
    marginLeft: 8,
    marginTop: 2,
    textAlign: 'left'
  }
});

export default styles;
