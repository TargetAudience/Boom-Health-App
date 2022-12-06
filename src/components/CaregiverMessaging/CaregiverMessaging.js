import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ViewMessages } from '@components/common';

class CaregiverMessaging extends Component {
  render() {
    const { navigation } = this.props;

    return <ViewMessages navigation={navigation} />;
  }
}

export default CaregiverMessaging;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});