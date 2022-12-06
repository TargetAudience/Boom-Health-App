import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  cellContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#e1e4e7',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cellRight: {
    justifyContent: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer2: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    color: '#1c1c1c'
  },
  textMedicine: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    marginTop: 1,
    marginBottom: 6,
    color: '#1c1c1c'
  },
  textDose: {
    fontSize: Platform.OS === 'ios' ? 13 : normalizeFont(12),
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    color: '#1c1c1c'
  },
  textDate: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(13.5),
    color: '#1c1c1c'
  },
  textTaken: {
    fontSize: 12.5,
    color: '#1db620'
  },
  textSkipped: {
    fontSize: 12.5,
    color: '#e45846'
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
  },
  buttonUpsellContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 12
  },
  buttonUpsellText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
    paddingTop: 1
  }
});

export default styles;
