import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

class IconButtonPress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPressed: false
    };
  }

  onPressIn() {
    this.setState({ isPressed: true });
  }

  onPressOut() {
    this.setState({ isPressed: false });
  }

  render() {
    const {  icon, style, viewStyle } = this.props;
    const { isPressed } = this.state;

    return (
      <View style={viewStyle}>
        <Image style={style} source={icon} resizeMode="cover" />
      </View>
    );
  }
}

IconButtonPress.propTypes = {
  icon: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  viewStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

IconButtonPress.defaultProps = {
  icon: null,
  viewStyle: null,
  noHitSlop: false
};

export default IconButtonPress;
