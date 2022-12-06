import React from 'react';
import { Image, TouchableHighlight } from 'react-native';
import images from '@assets/images';
import styles from './BackArrow.styles';

class BackArrow extends React.PureComponent {
  render() {
    const { onPressBack, close, white, backIconDark, backIconEmpty } = this.props;

    let displayImage = '';
    let styleIcon = '';
    let styleContainer = '';

    if (close) {
      displayImage = white ? images.iconCloseWhite : images.iconCloseWhite;
      styleIcon = styles.arrowClose;
      styleContainer = styles.containerClose;
    } else {
      let image = backIconDark ? images.arrowBackDark : images.arrowBack;
      let image2 = white ? images.arrowBackWhite : image;
      displayImage = backIconEmpty ? images.empty : image2;
      styleIcon = styles.arrowBack;
      styleContainer = styles.container;
    }

    return (
      <TouchableHighlight
        style={styleContainer}
        onPress={onPressBack}
        underlayColor="transparent"
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
        <Image source={displayImage} style={styleIcon} />
      </TouchableHighlight>
    )
  }
}

export default BackArrow;
