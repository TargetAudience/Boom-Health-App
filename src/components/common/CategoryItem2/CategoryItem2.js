import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import images from '@assets/images';
import { Colors, Globals } from '@constants/GlobalStyles';
import { AppText } from '@components/common';
import styles from './CategoryItem2.styles';

const CategoryItem2 = ({data, handler}) => {
  return (
    <TouchableHighlight
      onPress={handler}
      activeOpacity={0.6}
      underlayColor={Colors.white}>
      <View style={styles.rowContainer}>
        <View style={styles.labelContainer}>
          <AppText textWeight="500" style={styles.leftLabelText}>
            {data.name}
          </AppText>
          {data.description ? (
            <AppText textWeight="400" style={styles.leftLabelSubText}>
              {data.description}
            </AppText>
          ) : null}
        </View>
        <Image style={Globals.iconChevron} source={images.iconChevron} />
      </View>
    </TouchableHighlight>
  );
};

export default CategoryItem2;
