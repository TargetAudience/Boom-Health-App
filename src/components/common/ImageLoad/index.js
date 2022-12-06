import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';
import images from '@assets/images';
import { strNotNull, isImageExt } from '@utils/Globals';

class ImageLoad extends Component {
  render() {
    const {
      source: { uri },
      emptyBg
    } = this.props;

    if (strNotNull(uri) && isImageExt(uri)) {
      return (
        <FastImage
          {...this.props}
          fallback={emptyBg || images.emptyImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    } else {
      return <FastImage {...this.props} source={emptyBg || images.emptyImage} resizeMode={FastImage.resizeMode.contain} />;
    }
  }
}

export default ImageLoad;
