import React from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import { AppText } from '@components/common';
import styles from './ListItemImage.styles';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';

const ListItemImage = ({ onPress, mainText, selectionTextSize, selectionText, disabled = false, removePadding = false, selectionImage = null, selectionImageStyle = null }) => {

  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={0.7}
      underlayColor={Colors.white}>
      <View style={styles.rowContainer}>
       <View style={styles.rowInnerContainer}>
          <View style={styles.imageContainer}>
            <Image style={selectionImageStyle} source={selectionImage} />
          </View>
          <AppText textWeight="500" style={styles.mainText }>{mainText}</AppText>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.selectionTextContainer}>
          <AppText textWeight="300" style={styles.selectionText}>{selectionText}</AppText>
          </View>
          <Image style={Globals.iconChevron} source={images.iconChevron} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ListItemImage;