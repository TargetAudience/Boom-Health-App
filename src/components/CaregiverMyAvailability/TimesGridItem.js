import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import images from '@assets/images';

export default class TimesGridItem extends Component {
  onPressDelete = () => {
    const { onPress, index } = this.props;

    onPress(index);
  };

  render() {
    const { info, index, selected } = this.props;

    const dimStyle = selected ? styles.dim : '';

    return (
      <View style={styles.container}>
        <Text style={[styles.text, dimStyle]}>{info.start} to {info.end}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.onPressDelete}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
          <View style={styles.removeContainer}>
            <Text style={[styles.removeText, dimStyle]}>REMOVE</Text>
            <Image
              style={[styles.icon, dimStyle]}
              source={images.delete}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderColor: '#4c4c4c',
    marginBottom: 5
  },
  removeContainer: {
    flexDirection: 'row',
  },
  removeText: {
    marginRight: 8,
    color: '#000000',
    fontSize: 11,
    lineHeight: 18
  },
  icon: {
    marginTop: 1,
    width: 16,
    height: 16
  },
  text: {
    color: '#000000',
    fontSize: 15,
    lineHeight: 18
  },
  dim: {
    opacity: 0.40
  }
});
