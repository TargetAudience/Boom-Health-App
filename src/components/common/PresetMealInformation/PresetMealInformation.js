import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {
  AppButton
} from '@components/common';
import images from '@assets/images';
import { assetsUrl } from '@lib/Settings';
import styles from './PresetMealInformation.styles';
import { Colors } from '@constants/GlobalStyles';

const PresetMealInformation = ({ data, handler }) => {
    return (
        <View style={styles.container} activeOpacity={0.8}>
            <View style={styles.detail}>
                <Text style={styles.name}>{data.name}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton
                    style={styles.button}
                    onPress={handler}
                    width={46}
                    height={26}
                    backgroundColor={Colors.transparent}
                    disabled={false}>
                    <Text style={styles.buttonText}>View</Text>
                  </AppButton>
            </View>
        </View>
    );
};

export default PresetMealInformation;