import React from 'react';
import { Text, Image, TouchableHighlight, View } from 'react-native';
import { AppText } from '@components/common';
import styles from './ListItem.styles';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';

const ListItem = ({ onPress, mainText, selectionTextSize, selectionText, disabled = false, removePadding = false, styleContainer = null, selectionImage = null, selectionImageStyle = null }) => {
  const mainTextStyle = !disabled ? styles.mainText : styles.mainTextDisabled;
  const activeOpacity = !disabled ? 0.6 : 1;
  const styleRemove = removePadding ? styles.paddingRemove : '';
  const textSizeStyle = selectionTextSize ? selectionTextSize : 13;

  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={activeOpacity}
      underlayColor={Colors.white}>
      <View style={[styles.rowContainer, styleRemove, styleContainer]}>
        <AppText textWeight="500" style={mainTextStyle}>{mainText}</AppText>
        <View style={styles.rightContainer}>
          <AppText textWeight="300" style={[styles.selectionText, {fontSize: textSizeStyle}]}>{selectionText}</AppText>
          {selectionImage ? (
            <Image style={selectionImageStyle} source={selectionImage} />
          ) : null}
          <Image style={Globals.iconChevron} source={images.iconChevron} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ListItem;