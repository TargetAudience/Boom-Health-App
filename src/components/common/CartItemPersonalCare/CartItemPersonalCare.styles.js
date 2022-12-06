import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 94,
    backgroundColor: '#fff',
    paddingTop: 4,
    marginBottom: 1
  },
  priceContainer: {
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  quantityContainer: {
    marginRight: 20,
    borderColor: 'red',
    borderWidth: 10
  },
  removeContainer: {
    alignItems: 'center',
    marginLeft: 20
  },
  detail: {
    flex: 1
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 30,
    marginTop: 10,
    width: 110
  },
  name: {
    textAlign: 'left',
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2
  },
  description: {
    marginTop: 2,
    textAlign: 'left',
    color: '#000',
    fontSize: 13,
    fontWeight: '400'
  },
  textPrice: {
    textAlign: 'right',
    color: '#000',
    fontSize: 13.5,
    fontWeight: '600'
  },
  textWeek: {
    textAlign: 'left',
    color: '#6c6c6c',
    fontSize: 12,
    fontWeight: '300'
  },
  textQuantity: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
    fontWeight: '500'
  },
  increment: {
    width: 20,
    height: 20
  },
  cancel: {
    width: 20,
    height: 20
  }
});

export default styles;
