import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomHeaderBack, FormWrapper,AppText } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './MedicationRemindersNote.styles';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('window');

class MedicationRemindersNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notesText: ''
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
   // //this.mixpanel.track('View Medication Reminders Note');
  }

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  handleNote = note => {
    this.setState({ notesText: note });
  };

  render() {
    const { notesText } = this.state;

    const charactersRemaining = 250 - notesText.length;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack
          title="Note"
          onPressBack={this.onPressBack}
        />
        <KeyboardAwareScrollView extraScrollHeight={60} enableResetScrollToCoords={false} keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <FormWrapper style={styles.topGap}>             
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="transparent"
                placeholder="Note..."
                placeholderTextColor="#9E9E9E"
                value={notesText}
                maxLength={250}
                numberOfLines={4}
                onChangeText={text => this.handleNote(text)}
                multiline
                returnKeyType="done"
              />
              <AppText textWeight="300" style={styles.numCharacters}>{charactersRemaining} characters remaining</AppText>
            </View>
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
)(MedicationRemindersNote);
