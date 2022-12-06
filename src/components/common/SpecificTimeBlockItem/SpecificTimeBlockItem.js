import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import styles from './SpecificTimeBlockItem.styles';

export default class SpecificTimeBlockItem extends Component {
  render() {
    const { data, handler } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handler}
        style={styles.container}>
        <Text style={styles.text}>{data}</Text>
      </TouchableOpacity>
    );
  }
}
