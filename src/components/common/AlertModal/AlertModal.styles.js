import { StyleSheet, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-xr-xs-xsmax';
import { Colors } from '@constants/GlobalStyles';

let marginTop = 0;
if (isIphoneX()) {
  marginTop = 50;
} else if (Platform.OS === 'ios') {
  marginTop = 20;
}

const styles = StyleSheet.create({
  errorContainer: {
    marginTop,
    borderRadius: 6,
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: Colors.mainAlternative
  },
  errorMessage: {
    color: '#fff',
    fontSize: 14.5,
    fontWeight: '500'
  },
  successContainer: {
    marginTop,
    borderRadius: 6,
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: '#2eb775'
  },
  successMessage: {
    color: '#fff',
    fontSize: 14.5,
    fontWeight: '500'
  }
});

export default styles;
