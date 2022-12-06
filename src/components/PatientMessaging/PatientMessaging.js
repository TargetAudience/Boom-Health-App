import React, { Component } from 'react';
import { ViewMessages } from '@components/common';

class PatientMessaging extends Component {
  render() {
    const { navigation } = this.props;

    return <ViewMessages navigation={navigation} />;
  }
}

export default PatientMessaging;
