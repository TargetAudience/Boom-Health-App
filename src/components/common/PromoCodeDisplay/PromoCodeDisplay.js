import React, { Component } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { AppText } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PromoCodeDisplay.styles';

class PromoCodeDisplay extends Component {
  constructor(props) {
    super(props);
  }

  onPressButton = () => {
    const { promoCodeRemoveCallback } = this.props;
    
    promoCodeRemoveCallback();
  }

  render() {
    const { promoCode, savings } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.containerPromoCode}>
          <Image
            style={styles.promoCode}
            source={images.promoCode} />
        </View>
        <View style={styles.textContainer}>
          <AppText textWeight={'500'} style={styles.textPromo}>{promoCode}</AppText>
          <AppText textWeight={'500'} style={styles.textPromo}>${savings} Coupon</AppText>
        </View>
        <TouchableOpacity
          style={styles.touchable}
          onPress={this.onPressButton}
          activeOpacity={1.0}
          underlayColor="transparent"
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
           <Image source={images.cancel} style={styles.iconCancel} />
          </TouchableOpacity>
      </View>
      
    );
  }
}

export default PromoCodeDisplay;
