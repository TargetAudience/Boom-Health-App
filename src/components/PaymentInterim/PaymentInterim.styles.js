import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1, 
    backgroundColor: Colors.backgroundColor
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  buttonTextAdd: {
    marginTop: 1,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600'
  },
  buttonContainer: {
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 15
  },
  buttonContainerSecondRow: {
    marginTop: 15
  },
  miniSpacer: {
    height: 8
  },
  buttonText: {
    marginTop: 2,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600'
  },
  buttonTextDisabled: {
    marginTop: 2,
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: Colors.buttonDisabledText
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topText: {
    textAlign: 'left',
    color: Colors.nearBlack,
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '400',
    marginBottom: 20
  },
  hr: {
    borderTopWidth: 1,
    borderColor: Colors.listRowSpacer,
    flex: 1,
    marginTop: 10,
    marginBottom: 15,
  },
  optionsText: {
    textAlign: 'left',
    color: Colors.nearBlack,
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '400',
    marginBottom: 20
  },
  textCancelTransaction: {
    marginTop: 15,
    textAlign: 'center',
    color: Colors.textMain,
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '600',
    marginBottom: 20,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.textMain
  }
});

export default styles;
