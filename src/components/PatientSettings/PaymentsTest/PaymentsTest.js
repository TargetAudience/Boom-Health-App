import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  CustomHeaderBack,
  FormWrapper,
  InputWithLabel,
  ButtonLoading
} from '@components/common';
import { FormStyles } from '@constants/GlobalStyles';
import styles from './PaymentsTest.styles';

import * as AlertActions from '@ducks/alert';

import ProfileApi from '@api/profileApi';

class PaymentsTest extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      note: '',
      actionLoading: false,
      valid: false,
      params: {
        number: '',
        expMonth: 0,
        expYear: 0,
        cvc: '',
      }
    };


    this.onPressSend = this.onPressSend.bind(this);
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  async onPressSend() {
    const { actions } = this.props;
    const { note } = this.state;

    this.setState({ actionLoading: true });

  }

  render() {
    const { note, actionLoading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack
          title="Payments Test"
          onPressBack={this.onPressBack}
        />
        <KeyboardAwareScrollView>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={false}>

          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(PaymentsTest);
