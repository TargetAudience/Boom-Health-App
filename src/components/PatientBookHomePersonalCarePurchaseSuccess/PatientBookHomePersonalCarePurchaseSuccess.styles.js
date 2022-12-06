import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftLabelText: {
    fontSize: 13.5,
    marginTop: 2,
    color: '#1c1c1c',
    fontWeight: '600'
  },
  rightLabelText: {
    textAlign: 'right',
    fontSize: 13.5,
    marginTop: 2,
    color: '#1c1c1c',
    fontWeight: '600'
  },
  vanIcon: {
    width: 36,
    height: 36,
  },
  addressIcon: {
    width: 30,
    height: 30,
  },
  imageOrdered: {
    width: 260,
    height: 30,
    marginBottom: 10
  },
  deliveryIcon: {
    width: 20,
    height: 20
  },
  iconContainer: {
    width: 60,
  },
  textIconContainer: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 60,
    alignItems: 'flex-start',

  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textIconText: {
    lineHeight: 19,
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    fontWeight: '400'
  },
  textIconTextGapTop: {
    marginTop: 5
  },
  blankStateContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 60,
    alignItems: 'center',
    paddingBottom: 60,

  },
  blankStateText: {
    marginTop: 30,
    lineHeight: 19,
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    fontWeight: '400'
  },
  thanksText: {
    fontSize: 24,
    color: '#06a769',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 20
  },
  thankYouText: {
    fontSize: 16,
    color: '#8e9196',
    textAlign: 'center',
    fontWeight: '400'
  },
  thankYouText2: {
    fontSize: 16,
    lineHeight: 21,
    color: '#8e9196',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 40
  },
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600'
  },
  buttonContinue: {
    marginTop: 20
  },  
  statusBar: {
    height: 24,
  },

  sectionHeadingText: {
    marginTop: 22,
    marginBottom: 12,
    color: '#a8aeb7',
    fontSize: 13.5,
    paddingHorizontal: 10,
    letterSpacing: -0.2
  },
  rowContainer2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  rowContainerGroup: {
    marginTop: 30,
    width: '100%',
    borderTopColor: Colors.listRowSpacer,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addTopLine: {
    borderTopWidth: 1,
    borderTopColor: '#e7eaee'
  },
  name: {
    marginTop: 2,
    color: '#243b53',
    fontSize: 15,
    letterSpacing: -0.1,
    fontWeight: '600',
    marginLeft: 20
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  divider: {
    backgroundColor: Colors.red,
    height: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 0.5
  },
  indicator: {
    marginRight: 20
  },
  navImage: {
    width: 40,
    height: 40
  },
  questionIcon: {
    width: 32,
    height: 32
  }
});

export default styles;
