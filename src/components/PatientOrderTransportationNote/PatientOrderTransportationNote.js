import React, { Component } from 'react';
import { View, TextInput, ScrollView, Text, Dimensions } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Colors } from '@constants/GlobalStyles';
import { CustomHeaderBack, AppButton, AppText, ScreenWrapper } from '@components/common';
import styles from './PatientOrderTransportationNote.styles';

import * as AlertActions from '@ducks/alert';

const { width } = Dimensions.get('screen');

class PatientOrderTransportationNote extends Component {
  constructor(props) {
    super(props);

    const specialInstructions = this.props.navigation.getParam('specialInstructions', '');

    this.state = {
      note: specialInstructions
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Transportation Note');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  handleNote = note => {
    this.setState({ note });
  };

  onPresSave = () => {
    const { actions, navigation } = this.props;
    const { note } = this.state;

    if (note.length === 0) {
      actions.setAlert('Please be sure to add a note.');
      return;
    }
    navigation.goBack();
    navigation.state.params.onAddNote({ specialInstructions: note });
  };

  render() {
    const { note } = this.state;

    const charactersRemaining = 250 - note.length;

    return (
      <ScreenWrapper bottomBackground>
        <CustomHeaderBack title="Optional Instructions" onPressBack={this.onPressBack} />
        <ScrollView style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              placeholder="Message..."
              placeholderTextColor="#9E9E9E"
              value={note}
              maxLength={250}
              numberOfLines={4}
              onChangeText={liveNote => this.handleNote(liveNote)}
              multiline
              onFocus={this.onFocus}
              returnKeyType="done"
              onSubmitEditing={this.onPresSave}
            />
            <AppText textWeight="300" style={styles.numCharacters}>{charactersRemaining} characters remaining</AppText>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomContainerInner}>
              <AppButton
                style={styles.button}
                onPress={this.onPresSave}
                width={width - 20}
                height={42}
                backgroundColor={Colors.buttonMain}
                disabled={false}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>ADD NOTE</AppText>
              </AppButton>
            </View>
          </View>
        </ScrollView>
      </ScreenWrapper>
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
)(PatientOrderTransportationNote);
