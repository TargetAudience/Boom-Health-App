import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
   flexDirection: 'column',
   justifyContent: 'flex-start',
   textAlign: 'left'
  },
  labelStyle: {
    color: '#000',
    fontSize: Platform.OS === 'ios' ? 14 : 13.50,
    paddingBottom: 4,
    marginLeft: 2
  },
  imageDropdown: {
    width: 7,
    height: 16,
    marginRight: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 14
  },
  textInput: {
     fontSize: 15.5,
     fontWeight: '400',
     color: '#1c1c1c',
     paddingLeft: Platform.OS === 'ios' ? 0 : 10 
  }
});

export default styles;
