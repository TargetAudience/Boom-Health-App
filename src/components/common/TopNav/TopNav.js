import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import styles from './TopNav.styles';

const { width } = Dimensions.get('screen');

class TopNav extends Component {
  constructor(props) {
    super(props);
  }

  onPressTabOne = () => {
    const { onPress } = this.props;

    onPress('CaregiverMyAvailability');
  };

  onPressTabTwo = () => {
    const { onPress } = this.props;

    onPress('CaregiverMyAvailabilityCalendar');
  };

  getButtonStyle(page, tab) {
    const { navigation } = this.props;

    let backgroundColor = 'transparent';
    let borderRadius = 0;

    if (navigation.state.routeName === page) {
      backgroundColor = Colors.titleTextMain;
      borderRadius = 20;
    }

    const dynamicStyles = {
      backgroundColor,
      borderRadius
    };
    return dynamicStyles;
  }

  getTextStyle(page) {
    const { navigation } = this.props;

    let color = 'transparent';
    if (navigation.state.routeName === page) {
      color = '#fff';
    } else {
      color = Colors.titleTextMain;
    }
    const dynamicStyles = {
      color
    };
    return dynamicStyles;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <TouchableOpacity
            onPress={this.onPressTabOne}
            activeOpacity={1}
            style={{ width: width / 2 - 10 }}>
            <View
              style={[
                styles.miniWrap,
                this.getButtonStyle('CaregiverMyAvailability', 1),
              ]}>
              <Text
                style={[
                  styles.text,
                  this.getTextStyle('CaregiverMyAvailability'),
                ]}>
                WEEKLY AVAILABILITY
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressTabTwo}
            activeOpacity={1}
            style={{ width: width / 2 - 10 }}>
            <View
              style={[
                styles.miniWrap,
                this.getButtonStyle('CaregiverMyAvailabilityCalendar', 2),
              ]}>
              <Text
                style={[
                  styles.text,
                  this.getTextStyle('CaregiverMyAvailabilityCalendar'),
                ]}>
                CALENDAR
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TopNav;
