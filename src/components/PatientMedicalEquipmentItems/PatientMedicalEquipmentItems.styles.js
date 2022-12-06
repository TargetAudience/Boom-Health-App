import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
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
    borderBottomColor: Colors.background
  },
  listContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.listRowSpacer
  },
  leftLabelText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 14.5,
    marginTop: 2,
    color: '#1c1c1c',
    fontWeight: '600'
  },
  spacer: {
    width: '100%',
    height: 16,
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  signOutButtonContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#8795a8',
    borderRadius: 3,
    padding: 8,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20
  },
  signOutButtonText: {
    marginTop: 1,
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: -0.15,
    textAlign: 'center'
  },
  signedInAsText: {
    color: '#8f8f8f',
    fontSize: 12
  },
  emailText: {
    color: '#1c1c1c',
    fontSize: 12,
    paddingTop: 5,
    letterSpacing: 0.1
  },
  usernameContainer: {
    flexDirection: 'column',
    marginHorizontal: 5,
    paddingTop: 8,
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 8
  },
  blankStateContainer: {
    paddingTop: 50
  },
  blankStateText: {
    marginTop: 16,
    fontWeight: '400',
    fontSize: 16,
    color: '#8da3c5',
    textAlign: 'center',
    paddingHorizontal: 70
  },
});

export default styles;
