import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

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
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14)
  },
  description: {
    marginTop: 2,
    textAlign: 'left',
    color: '#000',
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5)
  },
  textPrice: {
    textAlign: 'right',
    color: '#000',
    fontSize: Platform.OS === 'ios' ? 13.5 : normalizeFont(13.5)
  },
  textWeek: {
    textAlign: 'left',
    color: '#6c6c6c',
    fontSize: Platform.OS === 'ios' ? 12 : normalizeFont(12)
  },
  textQuantity: {
    textAlign: 'center',
    color: '#000',
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14)
  },
  increment: {
    width: 20,
    height: 20
  },
  cancel: {
    width: 20,
    height: 20
  },

  buttonSizingB: {
    marginTop: 6
  },
  buttonTextContainer3: {
    paddingHorizontal: 8
  },
  buttonBuyText2: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  button: {
    marginTop: 3
  }
});

export default styles;
