import React, { PureComponent } from 'react';
import { View, Dimensions, Platform, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
//import MixpanelManager from '@utils/Analytics';
import { AppButton, ButtonLoading, AppText, InputWithLabel } from '@components/common';
import images from '@assets/images';
import { FormStyles, Colors } from '@constants/GlobalStyles';
import styles from './PatientDischargeNotifyModal.styles';

import ProfileApi from '@api/profileApi';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('screen');

const distances = [
  { key: '5', label: 'Myself', value: '5' },
  { key: '10', label: 'Everyone', value: '10' },
  { key: '20', label: 'Josh Stevenson', value: '20' },
];

class PatientDischargeNotifyModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false,
      inputTask: '',
      inputAssignTo: ''
    };

    this.selectRef = React.createRef();

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  onSubmit = async () => {
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

        //('Sent Modal Feedback');

        actions.setAlert('Your feedback has been sent. Thank you!');
        return;
      })
      .catch(error => {
        console.log('servicesCheck error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  };

  onPressToggleSelect = () => {
    this.selectRef.togglePicker(true);
  };

  onPressClose = () => {
    const { onPressCloseButton } = this.props;
    onPressCloseButton();
    this.setState({ 
      actionLoading: false,
      inputTask: '',
      inputAssignTo: ''
    });
  };

  render() {
    const {
      isModalOpen,
      onPressButtonLoading,
      actionLoading,
      onPressOne,
      onPressCloseButton,
    } = this.props;
    const { inputTask, inputAssignTo } = this.state;

    const buttonWidth = 180;

    return (
      <Modal
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isModalOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={this.onPressClose}>
        <KeyboardAvoidingView enabled behavior={Platform.OS === 'android' ? undefined : 'position'}>
          <View style={[styles.modalContent, { height: 270 }]}>
            {onPressCloseButton ? (
              <TouchableOpacity activeOpacity={0.8} onPress={this.onPressClose} style={styles.closeContainer}>
                <Image style={styles.close} source={images.close} resizeMode="cover" />
              </TouchableOpacity>
            ) : null}
            <AppText textWeight="600" style={styles.titleText}>
              Notify People
            </AppText>
            <AppText textWeight="300" style={styles.instructionsText}>
              You can automatically notify people in the Settings screen or manually send the current list and assignments to yourself, everyone, or a specific person:
            </AppText>
            <View style={styles.contentContainer}>
              <InputWithLabel
                onRef={ref => {
                  this.selectRef = ref;
                }}
                select
                selectPlaceholder="Send to"
                outerContainer={{ width: width - 113 }}
                items={distances}
                selectValue={inputAssignTo}
                containerStyle={[FormStyles.inputSelect, FormStyles.inputContainerLabel]}
                style={FormStyles.inputStyle}
                autoCorrect={false}
                autoFocus={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                maxLength={2}
                numberOfLines={1}
                returnKeyType="next"
                onDonePress={this.onPressToggleSelect}
                onValueChange={text => this.setState({ inputAssignTo: text })}
              />
            </View>
            {onPressButtonLoading ? (
              <ButtonLoading
                onPress={onPressButtonLoading}
                isLoading={actionLoading}
                containerStyle={FormStyles.button}>
                <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.buttonText}>
                  Send Message(s)
                </AppText>
              </ButtonLoading>
            ) : null}
            {!onPressButtonLoading ? (
              <View style={styles.cancelLinkContainer}>
                <AppButton
                  style={styles.buttonPatient}
                  onPress={onPressOne}
                  width={buttonWidth}
                  height={36}
                  backgroundColor={Colors.buttonMain}
                  disabled={false}>
                  <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.buttonText}>
                    Send Message(s)
                  </AppText>
                </AppButton>
              </View>
            ) : null}
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

export default connect(null, mapDispatchToProps)(PatientDischargeNotifyModal);
