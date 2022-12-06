import React from 'react';
import { View, Image } from 'react-native';
import AppText from '../AppText';

// from https://flatuicolors.com/
const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

class Avatar extends React.PureComponent {
  render() {
    let {
      src,
      name,
      color,
      textColor = '#fff',
      colors = defaultColors,
      fontDecrease,
      size,
      containerStyle,
      imageStyle,
      defaultName,
      radius = 0.5,
      weight
    } = this.props;

    if (!fontDecrease) fontDecrease = 2.5;

    if (!name) throw new Error('Avatar requires a name');

    if(typeof size !== 'number') size = parseInt(size);

    let abbr = name;
    if(!abbr) abbr = defaultName;

    if(isNaN(radius)) radius = 0.5

    const borderRadius = size * radius;

    const imageLocalStyle = {
      borderRadius
    };

    const innerStyle = {
      borderRadius,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    };

    if (size) {
      imageLocalStyle.width = innerStyle.width = size;
      imageLocalStyle.height = innerStyle.height = size;
    }

    let inner;
    if (src) {

      const props = {
        style: [imageLocalStyle, imageStyle],
        source: {uri: src}
      }

      inner = React.createElement( this.props.component || Image, props )

    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // pick a deterministic color from the list
        let i = sumChars(name) % colors.length;
        background = colors[i];
      }

      innerStyle.backgroundColor = background;

      inner = <AppText style={{fontFamily: 'SFProText', fontSize: size / fontDecrease, color: textColor, fontWeight: weight}}>{abbr}</AppText>
    }

    return (
      <View>
        <View style={[innerStyle, containerStyle]}>
          {inner}
        </View>
      </View>
    )
  }
}

module.exports = Avatar;
