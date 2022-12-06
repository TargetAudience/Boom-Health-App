import React, { Component } from 'react';
import { Room } from '@components/common';

class PatientMessagingSpace extends Component {
  render() {
    const { navigation } = this.props;

    return <Room navigation={navigation} />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({});

const mapStateToProps = (state: any) => {
  return {};
};

export default PatientMessagingSpace;
