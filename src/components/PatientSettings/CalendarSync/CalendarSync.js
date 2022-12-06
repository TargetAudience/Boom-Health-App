import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './CalendarSync.styles';

import * as AlertActions from '../../../state/ducks/alert';

class CalendarSync extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: ''
    };
  }

  componentDidMount() {

  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  render() {
    const { link } = this.state;

    return (
      <SafeAreaView>

      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarSync);
