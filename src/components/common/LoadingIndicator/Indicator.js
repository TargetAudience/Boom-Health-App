import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';

export default class Indicator extends PureComponent {
  constructor(props) {
    super(props);

    this.startAnimation = this.startAnimation.bind(this);

    this.state = {
      progress: new Animated.Value(0),
      animation: null
    };

    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;

    this.startAnimation();
  }

  componentWillUnmount() {
    this.stopAnimation();

    this.mounted = false;
  }

  startAnimation() {
    const { progress } = this.state;
    const { animationEasing, animationDuration } = this.props;

    if (!this.mounted) {
      return;
    }

    const animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      toValue: 1
    });

    Animated.loop(animation).start();

    this.setState({ animation });
  }

  stopAnimation() {
    const { animation } = this.state;

    if (animation === null) {
      return;
    }

    animation.stop();

    this.setState({ animation: null });
  }

  render() {
    const { renderComponent, ...props } = this.props;
    const { progress } = this.state;

    return (
      <Animated.View {...props}>
        {renderComponent({ progress })}
      </Animated.View>
    );
  }
}

Indicator.propTypes = {
  animationEasing: PropTypes.func,
  animationDuration: PropTypes.number,
  renderComponent: PropTypes.func
};

Indicator.defaultProps = {
  animationEasing: Easing.linear,
  animationDuration: 1500,
  renderComponent: null
};
