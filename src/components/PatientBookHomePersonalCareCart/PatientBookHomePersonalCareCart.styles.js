import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  imageBlankState: {
    width: 127,
    height: 100
  },
  blankStateContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  },
  blankStateText: {
    marginTop: 30,
    fontSize: 16,
    color: '#8b96a0',
    textAlign: 'center'
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1, 
    marginBottom: 90,
    backgroundColor: Colors.backgroundColor
  },
  bottomContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 90,
    borderTopWidth: 1,
    borderColor: '#e1e4e7'
  },
  bottomContainerInner: {
    height: 32,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20
  },  
  bottomContainerInnerB: {
    height: 48,
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 3
  },
  buttonText: {
    marginTop: 2,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600'
  },
  buyButtonText: {
    fontSize: 18
  },
  textSubtotal: {
    marginTop: 10,
    marginBottom: 5,
    color: '#1c1c1c',
    fontSize: 14.5,
    letterSpacing: 0.1,
    fontWeight: '500',
    lineHeight: 19,
    textAlign: 'left'
  },
  description: {
    color: '#1c1c1c',
    fontSize: 14,
    marginBottom: 5,
    letterSpacing: 0.1,
    fontWeight: '300',
    lineHeight: 19,
    textAlign: 'center'
  },
  textMeals: {
    marginTop: 20,
    color: '#1c1c1c',
    fontSize: 15,
    letterSpacing: 0.1,
    fontWeight: '600',
    lineHeight: 19,
    textAlign: 'center'
  },
  textDelivery: {
    marginTop: 10,
    color: '#1c1c1c',
    fontSize: 14.5,
    marginBottom: 5,
    fontWeight: '600',
    lineHeight: 19,
    textAlign: 'center'
  },
  textDescription: {
    marginTop: 15,
    marginHorizontal: 20,
    color: '#1c1c1c',
    fontSize: 14,
    marginBottom: 5,
    letterSpacing: 0.1,
    fontWeight: '300',
    lineHeight: 19,
    textAlign: 'center'
  },
  textUpsell: {
    marginTop: 12,
    marginHorizontal: 30,
    fontSize: 14,
    color: Colors.black,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 18
  },
  buttonUpsellContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12
  },
  buttonUpsellText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14.5,
    fontWeight: '600',
    color: Colors.white
  }
});

export default styles;
