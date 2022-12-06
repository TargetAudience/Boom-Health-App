import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ImageLoad, AppText } from '..';
import images from '@assets/images';
import { assetsUrl } from '@lib/Settings';
import styles from './EquipmentItem.styles';

const EquipmentItem = ({data, handler}) => {
  const thumb = `${assetsUrl}images/equipment/${data.thumb}`;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handler}>
      <View style={styles.thumbnail}>
        <ImageLoad
          emptyBg={images.placeholderEquipment}
          style={styles.imageThumb}
          source={{uri: thumb}}
        />
      </View>
      <View style={styles.detail}>
        <AppText textWeight="500" style={styles.name}>{data.name}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default EquipmentItem;
