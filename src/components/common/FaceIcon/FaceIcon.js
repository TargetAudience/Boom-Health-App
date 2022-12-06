import React from 'react';
import { View, Image } from 'react-native';
import images from '@assets/images';
import styles from './FaceIcon.styles';

const FaceIcon = ({ icon, style, ...otherProps }) => {
  const getImage = () => {
    switch (icon) {
      case 'great':
        return <Image style={[styles.icon, style]} {...otherProps} source={images.faceGreat} />;
      case 'good':
        return <Image style={[styles.icon, style]} {...otherProps} source={images.faceGood} />;
      case 'okay':
        return <Image style={[styles.icon, style]} {...otherProps} source={images.faceOkay} />;
      case 'bad':
        return <Image style={[styles.icon, style]} {...otherProps} source={images.faceBad} />;
      case 'awful':
        return <Image style={[styles.icon, style]} {...otherProps} source={images.faceAwful} />;
      default:
        return <Image style={[styles.icon, style]} {...otherProps} source={images.unknown} />;
    }
  };
  return getImage();
};

FaceIcon.defaultProps = {
  icon: null,
  style: null
};

export default FaceIcon;
