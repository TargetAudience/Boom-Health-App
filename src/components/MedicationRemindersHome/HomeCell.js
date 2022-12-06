import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  AsyncStorage,
  FontFamily,
  Animated,
  Pressable
} from 'react-native';
import { images } from '@images';
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
              this.getCellStyle(item),
              { backgroundColor: item.color }
            ]}
          >
            <Image style={styles.icon} source={item.icon} resizeMode="cover" />
            <AppText textWeight="600" style={styles.textTopic}>
              {item.topic.toUpperCase()}
            </AppText>
            <AppText textWeight="200" style={styles.textTopicSub}>
              {item.topicSub.toUpperCase()}
            </AppText>
          </View>
        </Animated.View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 130,
    width: width / 2 - 15
  },
  textTopic: {
    marginTop: 60,
    textAlign: 'center',
    textAlignVertical: 'top',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12.25,
    lineHeight: 12
  },
  textTopicSub: {
    marginTop: 3,
    textAlign: 'center',
    textAlignVertical: 'top',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 11.25,
    lineHeight: 12
  },
  icon: {
    position: 'absolute',
    top: 22,
    width: 50,
    height: 50
  }
});
