import { StyleSheet, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-xr-xs-xsmax';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

let marginTop = 0;
if (isIphoneX()) {
  marginTop = 50;
} else {
  marginTop = 20;
}

const styles = StyleSheet.create({
  errorContainer: {
    marginTop,
    marginHorizontal: 10,
    borderRadius: 6,
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: Colors.mainAlternative
  },
  errorMessage: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(14.5),
    fontWeight: '500',
    lineHeight: 20
  },
  successContainer: {
    marginTop,
    marginHorizontal: 10,
    borderRadius: 6,
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: '#2eb775'
  },
  successMessage: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    fontWeight: '500',
    lineHeight: 20
  }
});

export default styles;
