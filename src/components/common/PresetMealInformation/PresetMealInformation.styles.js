import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
  container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: 'white',
         borderWidth: 0,
        borderColor: 'red',
    },
    buttonContainer: {
        flexDirection: 'column'
    },
    detail: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    name: {
        textAlign: 'left',
        color: '#000',
        fontSize: 13.5,
        fontWeight: '500'  
    },
    button: {
        borderWidth: 1,
        borderColor: Colors.buttonMain
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.greenText,
        fontSize: 13.5,
        fontWeight: '500'
    }
});

export default styles;
