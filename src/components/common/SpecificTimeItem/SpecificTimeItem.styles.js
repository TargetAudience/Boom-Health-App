import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 62,
    backgroundColor: '#f2f3f4',
    borderRadius: 6,
    marginBottom: 10,
    marginHorizontal: 15,
    borderColor: '#eeeef0',
    borderWidth: 1,
    padding: 9
  },
  icon: {
    marginTop: 2
  },
  removeContainer: {
    flexDirection: 'row'
  },
  text: {
    color: '#1c1c1c',
    fontSize: 14.5,
    lineHeight: 18,
    fontWeight: '500'
  },
  textAvailability: {
    marginTop: 2,
    color: '#1c1c1c',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600'
  },
  textNote: {
    marginTop: 2,
    color: '#1c1c1c',
    fontSize: 14.5,
    lineHeight: 18,
    fontStyle: 'italic'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  }
});

export default styles;
