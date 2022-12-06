import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomHeaderBack, AppText, FormWrapper, InputWithLabel } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './MedicationRemindersStorage.styles';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('window');

class MedicationRemindersStorage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageCondtionsText: ''
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Medication Reminders Storage Conditions');
  }

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  render() {
    const { storageCondtionsText } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack
          title="Storage Conditions"
          onPressBack={this.onPressBack}
        />
        <KeyboardAwareScrollView extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>             
            <InputWithLabel
              onRef={this.doseRef}
              containerStyle={[
                FormStyles.inputContainer,
                FormStyles.inputContainerLabel
              ]}
              style={FormStyles.inputStyle}
              autoCorrect={false}
              autoFocus={false}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              maxLength={48}
              numberOfLines={1}
              returnKeyType="done"
              label="Add Storage Conditions"
              fontWeight="500"
              value={storageCondtionsText}
              onChangeText={text => {
                this.setState({ storageCondtionsText: text });
              }}
            />
          </FormWrapper>
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

const mapStateToProps = state => ({
  subRole: state.auth.subRole
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicationRemindersStorage);
