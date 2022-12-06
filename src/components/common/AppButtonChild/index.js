import React, { Component } from 'react';
import { Animated, Text, Pressable, View } from 'react-native';

import styles from './index.styles';

export default class AppButtonChild extends Component {
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.98,
      speed: 100,
      useNativeDriver: false
    }).start();
  };

  handlePressOut = () => {
    const { onPress } = this.props;

    Animated.spring(this.animatedValue, {
      toValue: 1,
      speed: 100,
      useNativeDriver: false
    }).start();
  };

  onPress = () => {
    const { onPress } = this.props;
    onPress();
  };

  render() {
    const {
      style,
      children
    } = this.props;

    const animatedStyle = { transform: [{ scale: this.animatedValue }] };

    return (
      <Pressable
        activeOpacity={0.8}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={this.onPress}
        style={style}>
        <Animated.View style={animatedStyle}>
          {children}
        </Animated.View>
      </Pressable>
    )
  }
}
