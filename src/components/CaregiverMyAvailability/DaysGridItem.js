import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import images from '@assets/images';
import { Colors } from '@constants/GlobalStyles';

export default class DaysGridItem extends Component {
  constructor() {
    super()
  }

  render() {
    const { info, index, on } = this.props;

    let backgroundStyles = styles.rowNormal;
    let textStyles = styles.textNormal;

    if (on) {
      backgroundStyles = styles.rowHighlighted;
      textStyles = styles.textHighlighted;
    }
    
    return (
      <TouchableOpacity activeOpacity={ 1 } onPress={() => this.props.onPress()}>
        <View style={styles.container}>
          <View style={[styles.icon, backgroundStyles]} />
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={ [styles.text, textStyles] }>{info.charAt(0)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  rowHighlighted: { backgroundColor: Colors.greenButtonB },
  rowNormal: { backgroundColor: '#e1e3e4' },
  textHighlighted: { color: '#ffffff' },
  textNormal: { color: '#000000' },
  icon: { borderRadius: 28/2, width: 28, height: 28 },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 28,
    width: 28,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderColor: '#4c4c4c',
    marginRight: 6
  },
  text: {
    color: '#6f6f6f',
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '700'
  }
})