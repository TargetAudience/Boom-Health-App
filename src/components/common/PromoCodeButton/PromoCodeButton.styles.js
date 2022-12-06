import { StyleSheet, Platform } from 'react-native';
import { normalizeFont } from '@utils/Responsive';

const styles = StyleSheet.create({
  touchable: {
    marginTop: 12,
  },
  container: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 9,
    paddingBottom: 9
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
});

export default styles;
