import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 38,
    backgroundColor: '#ec5ab4',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerLeft: {
    paddingTop: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  containerRight: {
    paddingTop: 1,
    alignItems: 'flex-end'
  },
  closeContainer: {
    justifyContent: 'center',
    height: '100%'
  },
  close: {
    width: 10,
    height: 10
  },
  bell: {
    width: 12,
    height: 14,
    alignSelf: 'center'
  },
  underlineContainer: {
    justifyContent: 'center',
    height: '100%'
  },
  textNotifications: {
    fontSize: 12.5,
    color: '#ffffff',
    textAlign: 'left',
    alignSelf: 'center',
    marginLeft: 8,
    letterSpacing: 0.1
  },
  textNotificationsUnderline: {
    fontSize: 12.5,
    color: '#ffffff',
    textAlign: 'left',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginLeft: 6,
    letterSpacing: 0.1
  },
  bottomImageStyle: {
    width: 220,
    height: 155
  }
});

export default styles;
