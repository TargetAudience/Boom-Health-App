import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginRight: 10
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginLeft: 20
  },
  textRemove: {
    color: '#1c1c1c',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'right',
    fontWeight: '500',
    textTransform: 'uppercase',
    marginRight: 8,
  },
  icon: {
    marginTop: 2
  },
  removeContainer: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  topGap: {
    marginTop: 32,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    marginTop: 16
  },
  instructionsText: {
    fontSize: 14,
    color: '#1c1c1c',
    lineHeight: 20,
    textAlign: 'left',
    marginBottom: 24,
    fontWeight: '400'
  },
  textTitle: {
    marginTop: 12,
    paddingTop: 14,
    paddingBottom: 6,
    paddingLeft: 20,
    fontSize: 14.5,
    color: '#1c1c1c',
    fontWeight: '600'
  },
  priceText: {
    marginTop: 2,
    lineHeight: 19,
    fontSize: 14.5,
    color: '#1c1c1c',
    fontWeight: '500'
  },
  descText: {
    marginTop: 2,
    lineHeight: 19,
    fontSize: 14.5,
    fontStyle: 'italic',
    color: '#1c1c1c',
    fontWeight: '400'
  },
  subCategoryText: {
    lineHeight: 19,
    fontSize: 14.5,
    color: '#1c1c1c',
    fontWeight: '600'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.listRowSpacerDark
  },
  invitesWrap: {
    backgroundColor: 'rgba(16, 100, 168, 0.08)',
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
    paddingRight: 10,
    alignItems: 'center'
  },
  buttonContainer2: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
  },
  firstButton: {
    marginRight: 6
  },
  addCardText: {
    marginTop: 1,
    textAlign: 'left',
    color: Colors.textMain,
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
  leftContainerInner: {
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'column',
    justifyContent: 'space-between'
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
