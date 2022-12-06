import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    Platform
} from 'react-native';
import images from '@assets/images';
import { Colors, Globals } from '@constants/GlobalStyles';
import { AppText } from '@components/common';
import styles from './CategoryItem.styles';

const CategoryItem = ({ data, handler }) => {
    return (
        <TouchableHighlight
            onPress={handler}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
                <View style={styles.lablelContainer}>
                    <AppText textWeight="500" style={styles.leftLabelText}>{data.category}</AppText>
                    {data.description ? (
                        <AppText textWeight="300" style={styles.leftLabelSubText}>{data.description}</AppText>
                    ) : null}
                </View>
                <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
        </TouchableHighlight>
    );
};

export default CategoryItem;