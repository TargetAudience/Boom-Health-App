import { StyleSheet, Platform } from 'react-native';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  touchable: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 9,
    paddingBottom: 9,
    marginBottom: 10,
    backgroundColor: '#e0e0e0'
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    flex: 1,
    marginLeft: 12
  },
  containerPromoCode: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPromo: {
    paddingTop: 2,
    fontSize: Platform.OS === 'ios' ? 14 : normalizeFont(14),
  },
  promoCode: {
    marginLeft: 12,
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconChevron: { 
    width: 9,
    height: 14,
    alignSelf: 'center', 
    marginRight: 12
  },
  iconCancel: {
    marginTop: 1,
    right: 12,
    width: 20,
    height: 20
  },
});

export default styles;
