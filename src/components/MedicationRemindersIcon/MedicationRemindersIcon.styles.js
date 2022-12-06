import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  containerB: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 14,
    backgroundColor: 'white',
  },
  carouselContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  carouselContainerB: {
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
  },
  itemSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderWidth: 0,
    borderColorx: '#ececec',
    padding: 12,
    borderRadius: 8,
    backgroundColorx: '#fce6f0',
    backgroundColor: '#f4f4f4'
  },
  cardImage: {
    height: 30,
    width: 30,
    borderWidth: 0,
    borderColor: 'red'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },
  scrollView: {
    marginBottom: 68
  },
  column: { 
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'flex-start' 
  },

  bottomContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 68,
    borderTopWidth: 1,
    borderColor: '#e1e4e7'
  },
  bottomContainerInner: {
    height: 68,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 3
  },
  buttonText: {
    marginTop: Platform.OS === 'ios' ? 2 : 0,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
  }
});

export default styles;
