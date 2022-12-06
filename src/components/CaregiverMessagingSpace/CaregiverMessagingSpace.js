import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Room } from '@components/common';

class CaregiverMessagingSpace extends Component {
  render() {
    const { navigation } = this.props;

    return <Room navigation={navigation} />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({});

const mapStateToProps = (state: any) => {
  return {};
};

export default CaregiverMessagingSpace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});