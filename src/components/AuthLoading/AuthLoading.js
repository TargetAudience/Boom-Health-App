import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async() => {
    const { navigation, state } = this.props;
    const isLoggedIn = !!((state.auth && state.auth.isUserSignedIn));
    const role = isLoggedIn ? state.auth.role : '';

    if (isLoggedIn && role === 'patient') {
      navigation.navigate('PostAuthFlowPatient');
    } else if (isLoggedIn && role === 'provider') {
      if (state.auth.subRole === 'personalCare') {
        navigation.navigate('PostAuthFlowPersonalCare');
      } else if (state.auth.subRole === 'caregiver') {
        navigation.navigate('PostAuthFlowCaregiver');
      }
    } else if (state.auth.subRole === 'guest') {
      navigation.navigate('GuestAuthFlowPatient');
    } else {
      navigation.navigate('PreAuthFlow');
    }
  };

  render() {
    return <View />;
  }
}

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  state: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
  state
});

export default connect(
  mapStateToProps,
  null
)(AuthLoadingScreen);

