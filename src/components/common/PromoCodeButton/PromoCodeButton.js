import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, ActivityIndicator, TouchableHighlight } from 'react-native';
import { FormWrapper, CreditCardIcon, InputWithLabel, ButtonLoading, CustomHeaderBack, AppButton, CheckmarkToggle, AppText } from '@components/common';
import { Colors, FormStyles, Globals } from '@constants/GlobalStyles';
import { isNumeric } from '@utils/Globals';
import images from '@assets/images';
import styles from './PromoCodeButton.styles';

import ProfileApi from '@api/profileApi';

class PromoCodeButton extends Component {
  constructor(props) {
    super(props);
  }

  onPressButton = () => {
    const { promoCodeButtonCallback } = this.props;
    
    promoCodeButtonCallback();
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.touchable}
        onPress={this.onPressButton}
        activeOpacity={0.9}
        underlayColor={Colors.lightGreyBackground}>
        <View style={styles.container}>
          <View style={styles.containerPromoCode}>
            <Image
              style={styles.promoCode}
              source={images.promoCode} />
          </View>
          <View style={styles.textContainer}>
            <AppText textWeight={'500'} style={styles.textPromo}>Have a Gift Card or Promo Code?</AppText>
          </View>
          <Image
            style={styles.iconChevron}
            source={images.chevronForward} />
        </View>
      </TouchableHighlight>
    );
  }
}

export default PromoCodeButton;
