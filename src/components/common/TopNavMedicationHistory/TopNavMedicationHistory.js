import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { Colors } from '@constants/GlobalStyles';
import styles from './TopNavMedicationHistory.styles';

const { width } = Dimensions.get('screen');

class TopNavMedicationHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'all'
    }
  }

  onPressTab = selectedTab => {
    const { onPress } = this.props;
    
    this.setState({ selectedTab });
    onPress(selectedTab);
  };

  getButtonStyle(page) {
    const { navigation } = this.props;
    const { selectedTab } = this.state;

    let backgroundColor = 'transparent';
    let borderRadius = 0;

    if (selectedTab === page) {
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
    const { selectedTab } = this.state;

    let color = 'transparent';
    if (selectedTab === page) {
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
            onPress={() => this.onPressTab('all')}
            activeOpacity={1}
            style={{ width: width / 3 - 10 }}>
            <View
              style={[
                styles.miniWrap,
                this.getButtonStyle('all'),
              ]}>
              <Text
                style={[
                  styles.text,
                  this.getTextStyle('all'),
                ]}>
                ALL
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressTab('taken')}
            activeOpacity={1}
            style={{ width: width / 3 - 10 }}>
            <View
              style={[
                styles.miniWrap,
                this.getButtonStyle('taken'),
              ]}>
              <Text
                style={[
                  styles.text,
                  this.getTextStyle('taken'),
                ]}>
                TAKEN
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressTab('skipped')}
            activeOpacity={1}
            style={{ width: width / 3 - 10 }}>
            <View
              style={[
                styles.miniWrap,
                this.getButtonStyle('skipped'),
              ]}>
              <Text
                style={[
                  styles.text,
                  this.getTextStyle('skipped'),
                ]}>
                SKIPPED
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TopNavMedicationHistory;
