import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  containerAlign: {
    marginTop: 60,
    alignItems: 'center'
  },
  textMessage: {
    fontSize: 14.5,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.titleMainText2,
    marginHorizontal: 40
  },
  textCity: {
    marginTop: 16,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.titleMainText2,
    marginHorizontal: 40
  },
  buttonContainer: {
    marginTop: 42,
    marginBottom: 40
  },
  secondButton: {
    marginTop: 16
  },
  buttonText: {
    marginTop: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontSize: 14.5,
    fontWeight: '600',
  },
  textApp: {
    marginTop: 20,
    textAlign: 'center',
    color: Colors.titleMainText2,
    fontSize: 13.5,
    fontWeight: '500'
  },
  imageSet: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeff3',
    padding: 0,
    borderRadius: 8
  },
  imageContainer: {
    alignItems: 'center',
    width: 65,
    borderWidth: 0,
    borderColor: 'red',
    paddingVertical: 6,
  },
  name: {
    borderWidth: 0,
    borderColor: 'red',
    width: 200,
    marginTop: 2,
    lineHeight: 16,
    color: '#1c1c1c',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
    textAlign: 'left',
  },
  navImage: {
    height: 28,

  }
});

export default styles;
