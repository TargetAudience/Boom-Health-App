import React from 'react';
import { Image, TouchableHighlight, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CartIcon, AppText } from '@components/common';
import images from '../../../assets/images';
import styles from './CustomHeaderBack.styles';

class CustomHeaderBack extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: '',
      password: ''
    };
  }

  renderLeft = () => {
    const { onPressBack } = this.props;

    if (onPressBack) {
      return (
        <TouchableHighlight
          style={styles.viewLeft}
          onPress={onPressBack}
          underlayColor="transparent"
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
          <Image source={images.arrowBack} style={styles.arrowBack} />
        </TouchableHighlight>
      );
    }
    return <View style={styles.viewLeft} />;
  };

  renderMiddle = () => {
    const { title, includeLogo, textSmall } = this.props;

    return (
      <View style={styles.viewMiddle}>
        {includeLogo ? (
          <Image source={images.logoHeader} style={styles.logo} />
        ) : (
          <AppText textWeight="600" style={textSmall ? styles.titleTextSmall : styles.titleText}>
            {title}
          </AppText>
        )}
      </View>
    );
  };

  renderRight = () => {
    const {
      onPressCustomRight,
      customRightText,
      onPressClose,
      onMenuPress,
      onPressCart,
      onPressFeedback,
      onPressSettings,
      cartItemCount,
      loading,
      hasLoading,
      hasLoadingB
    } = this.props;

    if (hasLoading) {
      return (
        <View style={styles.viewRightB}>
          {loading ? (
            <View style={styles.loaderContainerB}>
              <View style={styles.loaderInner}>
                <ActivityIndicator color="#6f757f" size="small" animating />
              </View>
            </View>
          ) : null}
          <TouchableHighlight
            onPress={onPressCustomRight}
            underlayColor="transparent"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <AppText textWeight="500" style={styles.customRightTextB}>
              {customRightText}
            </AppText>
          </TouchableHighlight>
        </View>
      );
    } else if (hasLoadingB) {
        return (
          <View style={styles.viewRightB}>
            {loading ? (
              <View style={styles.loaderContainer}>
                <View style={styles.loaderInner}>
                  <ActivityIndicator color="#6f757f" size="small" animating />
                </View>
              </View>
            ) : null}
          </View>
        );
    } else if (onPressCustomRight) {
      return (
        <View style={styles.viewRight}>
          <TouchableHighlight
            onPress={onPressCustomRight}
            underlayColor="transparent"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <AppText textWeight="500" style={styles.customRightText}>
              {customRightText}
            </AppText>
          </TouchableHighlight>
        </View>
      );
    } else if (onPressClose) {
      return (
        <View style={styles.viewRight}>
          <TouchableHighlight
            onPress={onPressClose}
            underlayColor="transparent"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <Image style={styles.close} source={images.close} />
          </TouchableHighlight>
        </View>
      );
    } else if (onMenuPress) {
      return (
        <View style={styles.viewRight}>
          <TouchableHighlight
            onPress={onMenuPress}
            underlayColor="transparent"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <Image style={styles.iconEllipsis} source={images.ellipsis} />
          </TouchableHighlight>
        </View>
      );
    } else if (onPressSettings) {
      return (
        <View style={styles.viewRight}>
          <TouchableHighlight
            onPress={onPressSettings}
            underlayColor="transparent"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <Image style={styles.iconSettings} source={images.settings} />
          </TouchableHighlight>
        </View>
      );
    } else if (onPressCart) {
      return (
        <View style={styles.viewRight}>
          <TouchableOpacity
            onPress={onPressCart}
            activeOpacity={0.8}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <CartIcon numberText={cartItemCount} />
          </TouchableOpacity>
        </View>
      );
    } else if (onPressFeedback) {
      return (
        <View style={styles.viewRight}>
          <TouchableOpacity
            onPress={onPressFeedback}
            activeOpacity={0.8}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <Image style={styles.feedback} source={images.feedback} />
          </TouchableOpacity>
        </View>
      );
    } else if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderInner}>
            <ActivityIndicator color="#6f757f" size="small" animating />
          </View>
        </View>
      );
    }

    return <View style={styles.viewRight} />;
  };

  render() {
    const { includeLogo } = this.props;

    let height = 58;
    if (includeLogo) {
      height = 64;
    }

    return (
      <View style={[styles.container, { height }]}>
        {this.renderLeft()}
        {this.renderMiddle()}
        {this.renderRight()}
      </View>
    );
  }
}

CustomHeaderBack.defaultProps = {
  includeLogo: null
};

export default CustomHeaderBack;
