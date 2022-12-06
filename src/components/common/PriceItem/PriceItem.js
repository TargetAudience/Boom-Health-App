import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import images from '@assets/images';
import { Colors, Globals } from '@constants/GlobalStyles';
import styles from './PriceItem.styles';

const PriceItem = ({ data, handler }) => {
    return (
        <TouchableHighlight
            onPress={handler}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
                <View style={styles.lablelContainer}>
                    <Text style={styles.leftLabelText}>{data.name}</Text>
                    {data.description ? (
                        <Text style={styles.leftLabelSubText}>{data.description}</Text>
                    ) : null}
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.rightPriceLabelText}>${data.price}</Text>
                    <Image style={Globals.iconChevron} source={images.iconChevron} />
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default PriceItem;