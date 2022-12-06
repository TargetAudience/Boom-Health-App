import { StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'white',
        marginBottom: 2
    },
    priceContainer: {
        marginTop: 2,
        flexDirection: 'column',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'white',
    },
    thumbnail: {
        marginRight: 12
    },
    detail: {
        flex: 1
    },
    name: {
        textAlign: 'left',
        color: '#000',
        fontSize: 14,
        fontWeight: '600'
    },
    description: {
        textAlign: 'left',
        color: '#000',
        fontSize: 13.5,
        fontWeight: '300'
    },
    imageThumb: {
        width: 60,
        height: 60
    },
    textPrice: {
        textAlign: 'right',
        color: '#000',
        fontSize: 13.5,
        fontWeight: '600'
    },
    textWeek: {
        textAlign: 'right',
        color: '#6c6c6c',
        fontSize: 12,
        fontWeight: '300'
    }
});

export default styles;
