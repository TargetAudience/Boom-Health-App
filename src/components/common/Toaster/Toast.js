import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  Text,
  Platform
} from 'react-native'
import { AppText } from '@components/common';
import { hasNotch } from '@freakycoder/react-native-helpers';
import ToastStyles from './ToastStyles'

const noop = () => 0

class Toast extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    styles: PropTypes.object,
    duration: PropTypes.number,
    height: PropTypes.number,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    onPress: PropTypes.func
  }

  static defaultProps = {
    styles: ToastStyles.info,
    duration: 3000,
    height: 100,
    onShow: noop,
    onHide: noop,
    onPress: noop
  }

  state = { animatedValue: new Animated.Value(0), timeoutId: null }

  UNSAFE_componentWillMount () {
    this.showToast()
  }

  componentWillUnmount () {
    const { timeoutId } = this.state;
    clearTimeout(timeoutId)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (this.props.id !== nextProps.id) {
      this.showToast()
    }
  }

  showToast () {
    const animatedValue = new Animated.Value(0)

    this.setState({ animatedValue })

    Animated
      .timing(animatedValue, { toValue: 1, duration: 350, useNativeDriver: true })
      .start()

    const { duration, onShow } = this.props
    const timeoutId = setTimeout(() => this.hideToast(), duration + 350)

    this.setState({ timeoutId }, onShow)
  }

  hideToast () {
    const { timeoutId, animatedValue } = this.state

    clearTimeout(timeoutId)

    Animated
      .timing(animatedValue, { toValue: 0, duration: 350, useNativeDriver: true })
      .start()

    setTimeout(this.props.onHide, 350)
  }

  onPress = () => {
    this.hideToast()
    this.props.onPress()
  }

  render () {
    const y = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-this.props.height, 0]
    })

    const { styles } = this.props
    let text = this.props.text

    if (Object.prototype.toString.call(text) === '[object String]') {
      text = (
        <View style={styles.container}>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '400'}`} style={styles.text}>{text}</AppText>
        </View>
      )
    }
console.log('hasNotch()', hasNotch())
    return (
     
      <Animated.View 
        style={{
          position: 'absolute',
          top: hasNotch() ? 40 : 0,
          right: 0,
          left: 0,
          zIndex: 9999999,
          transform: [{ translateY: y }]
        }}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          {text}
        </TouchableWithoutFeedback>
      </Animated.View>
     
    )
  }
}

export default Toast
