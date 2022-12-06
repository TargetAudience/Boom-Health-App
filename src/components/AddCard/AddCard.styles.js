import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

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
    color: '#1c1c1c',
    fontWeight: '600'
  },
  textCardText: {
    lineHeight: 19,
    paddingLeft: 10,
    fontSize: 13.5,
    color: '#1c1c1c',
    fontWeight: '500'
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
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: Colors.white
  },
  firstButton: {
    marginRight: 6
  },
  addCardText: {
    marginTop: 1,
    textAlign: 'left',
    color: Colors.greenText,
    fontSize: 14,
    fontWeight: '700',
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
    marginLeft: 10,
    flex: 1
  },
  textDefault: {
    marginTop: -12,
    textAlign: 'left',
    color: Colors.greenText,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 54
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
