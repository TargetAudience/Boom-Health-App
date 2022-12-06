import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '@components/common';
import { Colors } from '@constants/GlobalStyles';

export default class FeedbackGrid extends Component {
  backgroundStyle = function(flagged) {
    let borderWidth = 0;
    let borderColor = '#e6e6e6';
    let backgroundColor = '#f1f1f1';

    if (flagged) {
      borderWidth = 2;
      borderColor = Colors.highlight;
      backgroundColor = '#f1f1f1';
    }

    return { backgroundColor, borderWidth, borderColor };
  };

  onSelected(current) {
    const { onGridSelected } = this.props;

    onGridSelected(current);
  }

  render() {
    const { buttons, selected } = this.props;

    const gridItems = buttons.map((info, i) => (
      <TouchableOpacity
        key={i}
        activeOpacity={1}
        style={[styles.containerInner, this.backgroundStyle(i === selected)]}
        onPress={() => this.onSelected(i)}>
        <Image
          style={[styles.icon, { width: info.width, height: info.height }]}
          source={info.iconInactive}
          resizeMode="cover"
        />
        <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.text}>{info.name}</AppText>
      </TouchableOpacity>
    ));
    return <View style={styles.container}>{gridItems}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  containerInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '49%',
    height: 32,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    borderColor: '#4c4c4c',
    marginBottom: 6
  },
  icon: {
    marginTop: 0.5,
    marginRight: 5
  },
  text: {
    color: '#000000',
    fontSize: 13.5,
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    marginLeft: 2
  }
});
