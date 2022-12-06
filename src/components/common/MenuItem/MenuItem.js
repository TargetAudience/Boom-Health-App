import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ImageLoad} from '..';
import images from '@assets/images';
import {photosUrl} from '@lib/Settings';
import styles from './MenuItem.styles';

const MenuItem = ({data, handler}) => {
  const item = data.item;
  const thumb = `${photosUrl}meals/${item.thumbnail}`;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handler}>
      <View style={styles.thumbnail}>
        <ImageLoad
          emptyBg={images.foodPlaceholder}
          style={styles.imageThumb}
          source={{uri: thumb}}
        />
      </View>
      <View style={styles.detail}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.textPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;
