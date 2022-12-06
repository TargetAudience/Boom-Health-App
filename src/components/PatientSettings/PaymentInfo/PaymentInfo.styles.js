import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  topGap: {
    marginTop: 26,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    marginTop: 16
  },
  textYourCreditCard: {
    marginTop: 12,
    paddingTop: 14,
    paddingBottom: 4,
    paddingLeft: 20,
    fontSize: 14.5,
    color: '#1c1c1c'
  },
  textCardText: {
    lineHeight: 19,
    paddingLeft: 10,
    fontSize: 13.5,
    color: '#1c1c1c'
  },
  cardTypeWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  invitesContainer: {
    flexDirection: 'column',
  },
  invitesWrap: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(16, 100, 168, 0.08)',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(16, 100, 168, 0.08)'
  },
  invitesInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'flex-start',
    alignItems: 'center'
  },
  buttonContainer2: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 13.5,
    fontWeight: '500'
  },
  firstButton: {
    marginRight: 6
  },
  addCardText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    textAlign: 'left',
    color: Colors.textMain,
    fontSize: 14,
    marginLeft: 4
  },
  plusIcon: {
    width: 18,
    height: 18
  },
  addCardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 12
  },
  cardTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 0,
    flex: 1
  },
  textDefault: {
    marginTop: -12,
    textAlign: 'left',
    color: Colors.textMain,
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 54,
    letterSpacing: -0.3,
    textTransform: 'uppercase'
  },
  savedCardsText: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    fontSize: 14.5,
    color: '#1c1c1c',
    fontWeight: '400'
  }
});

export default styles;
