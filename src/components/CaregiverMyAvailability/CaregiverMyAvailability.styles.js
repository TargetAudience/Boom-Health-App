import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  callsWrap: { 
    marginHorizontal: 12,
    marginTop: 20, 
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 8
  },
  messageWrap: { 
    marginHorizontal: 10, 
    marginTop: 15, 
    marginBottom: 12
  },
  textMessage: { 
    color: '#1c1c1c', 
    fontSize: 14, 
    lineHeight: 19,
    fontWeight: '400'
  },
  textMessage2: {
    marginTop: 10
  },
  scrollView: {
    height: '100%'
  }
});

export default styles;
