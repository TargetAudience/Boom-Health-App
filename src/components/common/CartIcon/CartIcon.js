import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import images from '@assets/images';
import styles from './CartIcon.styles';

class CartIcon extends PureComponent {
  render() {
    const { numberText } = this.props;

    const showNumber = numberText != 0 ? true : false;

    return (
      <View style={styles.containerStyle}>
        {showNumber ? (
          <View style={styles.roundContainer}>
            <Text style={styles.numberText}>{numberText}</Text>
          </View>
        ) : null}
        <Image source={images.shoppingCart} style={styles.cartIcon} />
      </View>
    );
  }
}

export default CartIcon;
