import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  leftLabelText: {
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
    marginTop: 2,
    color: '#1c1c1c'
  },
  rightLabelText: {
    textAlign: 'right',
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5),
    marginTop: 2,
    color: '#1c1c1c'
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
  iconContainer: {
    width: 60
  },
  textIconContainer: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: -60
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  textIconText: {
    lineHeight: 19,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    color: '#000',
    textAlign: 'center'
  },
  textIconTextGapTop: {
    marginTop: 5
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 60,
    alignItems: 'center',
    paddingBottom: 60
  },
  informationText: {
    marginTop: 30,
    lineHeight: 19,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    color: '#000',
    textAlign: 'center'
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 0 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5)
  },
  buttonContinue: {
    marginTop: 20
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
  }
});

export default styles;
