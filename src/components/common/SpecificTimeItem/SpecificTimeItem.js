import React, { Component } from 'react'
import { View,StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import images from '@assets/images';
import styles from './SpecificTimeItem.styles';

export default class SpecificTimeItem extends Component {
  render() {
    const { data, handler } = this.props;

    const noteDiplay = data.note ? data.note : 'No note provided';

    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.text}>{data.start} to {data.end}</Text>
          <Text style={styles.textNote}>{noteDiplay}</Text>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity activeOpacity={0.6} onPress={handler}>
            <View style={styles.removeContainer}>
              <Text style={styles.textRemove}>REMOVE</Text>
              <Image style={[styles.icon, {width: 16, height: 16}]} source={images.delete} resizeMode="cover" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  onSelected(current) {
    this.props.onPress(current)
  }
}
