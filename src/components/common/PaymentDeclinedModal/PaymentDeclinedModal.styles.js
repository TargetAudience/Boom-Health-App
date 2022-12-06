import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    padding: 22,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 260,
  },
  scrollViewContainer: {
    overflow: 'hidden',
    height: 90
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.nearBlack,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '700',
    marginBottom: 20
  },
  buttonText: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 13.5,
    fontWeight: '600'
  },
  helpText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.nearBlack,
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '300',
    marginBottom: 20
  },
  textDeclined: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.nearBlack,
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '500'
  },
  textTitle: {
    fontSize: 13,
    marginBottom: 2,
    textAlign: 'left',
    fontWeight: '300'
  },
  textValue: {
    fontSize: 14,
    marginBottom: 2,
    textAlign: 'left',
    fontWeight: '500'
  },
  column: {
    marginBottom: 10,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default styles;
