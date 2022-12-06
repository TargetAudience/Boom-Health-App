import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Animated,
  Pressable
} from 'react-native';
import { normalizeFont } from '@utils/Responsive';
import { AppText } from '@components/common';

const { width } = Dimensions.get('window');

export default class HomeCell extends Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.96,
      speed: 100,
      useNativeDriver: false
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      speed: 100,
      useNativeDriver: false
    }).start();
  };

  handlePress = () => {
    const { onPress } = this.props;
    onPress();
  };

  getCellStyle(item) {
    if (item.firstRow == true) {
      return {
        marginLeft: 10
      };
    } else {
      return {
        marginRight: 10
      };
    }
  }

  render() {
    const { item } = this.props;

    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    };

    return (
      <Pressable
        activeOpacity={0.8}
        onPress={this.handlePress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View style={animatedStyle}>
          <View
            key={item.id}
            style={[
              styles.cell,
              this.getCellStyle(item)
            ]}
          >
            <AppText textWeight="600" style={styles.textTopic}>
              {item.name.toUpperCase()}
            </AppText>
            <AppText textWeight="200" style={styles.textTopicSub}>
              {item.description}
            </AppText>
            <Image style={[styles.icon, { width: item.iconW, height: item.iconH }]} source={item.image} />
          </View>
        </Animated.View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'column',
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderRadius: 5,
    height: 136,
    width: width / 2 - 15,
    backgroundColor: '#f0f4f8',
  },
  textTopic: {
    textAlignVertical: 'top',
    color: '#1c1c1c',
    fontSize: 14.5,
    lineHeight: 17,
    letterSpacing: -0.25,
  },
  textTopicSub: {
    marginTop: 5,
    textAlignVertical: 'top',
    color: '#1c1c1c',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.25,
  },
  icon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  }
});
