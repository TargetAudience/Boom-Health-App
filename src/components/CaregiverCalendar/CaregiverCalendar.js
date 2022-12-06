import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppButton } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import styles from './CaregiverCalendar.styles';

import * as AuthActions from '@ducks/auth';

class CaregiverCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Caregiver Calendar</Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  pubnub: state.pubnub
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaregiverCalendar);
