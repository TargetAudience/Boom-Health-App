import React from 'react';
import { View, Image } from 'react-native';
import images from '@assets/images';
import styles from './CreditCardIcon.styles';

const CreditCardIcon = ({ icon, style, ...otherProps }) => {
  const getCardImage = () => {
    switch (icon) {
      case 'american-express':
        return (
          <Image
            style={[styles.icon, style]}
            {...otherProps}
            source={images.americanExpress}
          />
        );
      case 'discover':
        return (
          <Image
            style={[styles.icon, style]}
            {...otherProps}
            source={images.discover}
          />
        );
      case 'mastercard':
        return (
          <Image
            style={[styles.icon, style]}
            {...otherProps}
            source={images.mastercard}
          />
        );
      case 'visa':
        return (
          <Image style={[styles.icon, style]} {...otherProps} source={images.visa} />
        );
      default:
        return (
          <Image
            style={[styles.icon, style]}
            {...otherProps}
            source={images.unknown}
          />
        );
    }
  };
  return <View>{getCardImage()}</View>;
};

CreditCardIcon.defaultProps = {
  icon: null,
  style: null
};

export default CreditCardIcon;
