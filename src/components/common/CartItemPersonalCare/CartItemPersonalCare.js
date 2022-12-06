import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import images from '@assets/images';
import styles from './CartItemPersonalCare.styles';

class CartItemPersonalCare extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, onPressRemoveItem } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.detail}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.description}>{data.dateDisplay}</Text>
          <Text style={styles.description}>{data.timeDisplay}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.textPrice}>${data.price}</Text>
        </View>
        <View style={styles.removeContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressRemoveItem}>
            <Image source={images.cancel} style={styles.cancel} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CartItemPersonalCare;
