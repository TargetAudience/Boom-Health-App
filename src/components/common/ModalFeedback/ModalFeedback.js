import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Easing,
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
//import MixpanelManager from '@utils/Analytics';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppText } from '@components/common';
import FeedbackGrid from './FeedbackGrid';
import images from '@assets/images';
import {
  InputWithLabel,
  ButtonLoading,
  AlertModal
} from '@components/common';
import { FormStyles, Colors } from '@constants/GlobalStyles';

import ProfileApi from '@api/profileApi';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('screen');

class ModalFeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: '',
      buttons: [
        {
          name: 'Suggestion',
          iconActive: images.iconIdeaActive,
          iconInactive: images.iconIdeaInactive,
          width: 17,
          height: 17
        },
        {
          name: 'Bug',
          iconActive: images.iconBugActive,
          iconInactive: images.iconBugInactive,
          width: 17,
          height: 17
        },
        {
          name: 'Content',
          iconActive: images.iconContentActive,
          iconInactive: images.iconContentInactive,
          width: 16,
          height: 16
        },
        {
          name: 'Compliment',
          iconActive: images.iconThumbsUpActive,
          iconInactive: images.iconThumbsUpInactive,
          width: 15,
          height: 17
        },
        {
          name: 'Other',
          iconActive: images.iconOtherActive,
          iconInactive: images.iconOtherInactive,
          width: 17,
          height: 17
        }
      ],
      selected: 0,
      actionLoading: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  onSubmit = async ()  => {
    const { navigation, actions, onPressCancel } = this.props;
    const { comments, selected } = this.state;

    if (comments === '') {
      actions.setAlertModal('Please enter a feedback comment.');
      return;
    }

    this.setState({ actionLoading: true });

    await ProfileApi.addFeedback({
      comments,
      selected
    })
      .promise.then(async () => {
        this.setState({ actionLoading: false, comments: '', selected: 0 });

        onPressCancel();

        ////this.mixpanel.track('Sent Modal Feedback');

        actions.setAlert('Your feedback has been sent. Thank you!');
        return;
      })
      .catch(error => {
        console.log('servicesCheck error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  onGridSelected(index) {
    this.setState({ selected: index });
  }

  render() {
    const { isModalOpen, onPressCancel, helpText } = this.props;
    const { comments, selected, buttons, actionLoading } = this.state;

    return (
      <Modal
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isModalOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={onPressCancel}>
        <AlertModal />
        <KeyboardAvoidingView enabled  behavior={Platform.OS === "android" ? undefined : "position"}>
          <View style={styles.modalContent}>
            <View style={styles.containerTop}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.textTitle}>Feedback</AppText>
            </View>
            <View style={styles.containerText}>
              <AppText textWeight="300" style={styles.textBody}>We would like your feedback to help us improve our service and
                app. We read all feedback.</AppText>
            </View>
            <View style={styles.feedbackGrid}>
              <FeedbackGrid
                buttons={buttons}
                selected={selected}
                onGridSelected={index => this.onGridSelected(index)}
              />
            </View>
            <View style={styles.center}>
              <TextInput
                style={styles.textInput}
                autoCapitalize="sentences"
                autoCorrect={true}
                multiline={true}
                numberOfLines={2}
                underlineColorAndroid="transparent"
                keyboardType={'web-search'}
                textAlign="left"
                placeholder={'Enter feedback...'}
                placeholderTextColor="rgba(0,0,0,.3)"
                autoFocus={false}
                maxLength={500}
                value={comments}
                onChangeText={text => this.setState({ comments: text })}
              />
            </View>
            <View style={styles.buttonContainer}>
              <ButtonLoading
                onPress={this.onSubmit}
                isLoading={actionLoading}
                containerStyle={styles.buttonSignIn}>
                <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonSignInText}>Send Feedback</AppText>
              </ButtonLoading>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
)(ModalFeedback);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'flex-start',
    height: 394,
    marginBottom: 20
  },
  feedbackGrid: {
    marginTop: 14
  },
  inputStyleMultiLine: {
    height: 90,
    width: '100%',
    padding: 4,
    fontSize: 15
  },
  containerTop: {
    height: 44,
    alignSelf: 'stretch',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    paddingLeft: 20
  },
  containerText: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 12
  },
  center: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8
  },
  textTitle: {
    fontSize: 15,
    marginTop: 3
  },
  textBody: {
    fontSize: Platform.OS === 'ios' ? 14.5 : 13.5,
    lineHeight: 19
  },
  textInput: {
    width: width - 80,
    height: 80,
    backgroundColor: '#f1f1f1',
    color: '#000000',
    fontSize: 14,
    paddingLeft: 8,
    paddingTop: 8,
    borderRadius: 3
  },
  buttonContainer: {
    flex: 1, 
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 30
  },
  buttonSignInText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff'
  },
  buttonSignIn: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    width: '100%',
    height: 36
  }
});
