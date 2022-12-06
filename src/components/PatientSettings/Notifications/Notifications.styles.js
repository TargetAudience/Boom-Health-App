import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  topGap: {
    marginTop: 16,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    marginTop: 16
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
  textNote: {
    textAlign: 'left',
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 14.5 : 13.5,
    fontWeight: '400',
    marginBottom: 8
  },
  checkbox: {
    marginTop: 5,
    marginBottom: 5
  },
  noteContainer: {
    marginTop: 26,
    paddingHorizontal: 20,
  },
  bottomImageStyle: {
    width: 220,
    height: 155
  }
});

export default styles;
