import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import images from '@assets/images';
import { Colors, Globals } from '@constants/GlobalStyles';
import { AppText } from '@components/common';
import styles from './AppointmentItem.styles';
import { uppercaseFirst } from '@utils/Globals';

const AppointmentItem = ({ data, handler }) => {
    const topLineStyle = data.addTopLine === 1 ? styles.addTopLine : '';

    let topValue = '';
    if (data.appointmentType === 'meals') {
        topValue = 'Delivery Today';
    } else if (data.appointmentType === 'equipment') {
        if (data.typeSpecific === 'standard') {
            topValue = uppercaseFirst(data.typeSpecificB) + ' Delivery';
        } else {
            topValue = 'Delivery Today';
        }
    } else {
        topValue = data.time;
    }

    return (
        <TouchableHighlight
            onPress={handler}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={[styles.rowContainer, topLineStyle]}>
                <View style={styles.lablelContainer}>
                    <AppText textWeight="600" style={styles.leftLabelText}>{topValue}</AppText>
                    <AppText textWeight="300" style={styles.leftLabelSubText}>{data.description}</AppText>
                </View>
                <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
        </TouchableHighlight>
    );
};

export default AppointmentItem;