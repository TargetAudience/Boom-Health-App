import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import images from '@assets/images';
import { AppText, Input, ButtonLoading, AlertModal } from '@components/common';
import { FormStyles } from '@constants/GlobalStyles';
//import MixpanelManager from '@utils/Analytics';
import styles from './PromoCodeModal.styles';

import PaymentApi from '@api/paymentApi';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('screen');

class PromoCodeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false,
      promoCode: ''
    };

    this.onPressSave = this.onPressSave.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  onPressBackdrop() {
    const { onPressCloseButton } = this.props;

    onPressCloseButton();

    setTimeout(() => {
      this.setState({ promoCode: '' });
    }, 100);
  }

  onPressSave = async () => {
    const { onPressOne, subtotal = null, hasMultipleSubtotals = false, actions, vertical } = this.props;
    const { promoCode } = this.state;

    if (promoCode === '') {
      actions.setAlertModal('Please enter your Gift Card or Promo Code.');
      return;
    }

    this.setState({ actionLoading: true });

    await PaymentApi.addPromoCode({
      promoCode,
      vertical,
      subtotal,
      hasMultipleSubtotals
    })
      .promise.then(async result => {
        const valid = result.data.valid;

        if (valid) {
          const savings = result.data.savings;

         ////this.mixpanel.track('Entered Promo Code - Valid');

          setTimeout(() => {
            onPressOne({ savings, promoCode });
            this.setState({ actionLoading: false });
          }, 500);
        } else {
          const message = result.data.message;

          this.setState({ actionLoading: false });
          actions.setAlertModal(message, 'longDuration');
        }

        return;
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlertModal(error.data.statusText);
      });
  };

  onModalHide = () => {
    const { actions } = this.props;

    this.setState({ actionLoading: false, promoCode: '' });

    actions.clearAlertModal();
  };

  render() {
    const {
      isModalOpen,
      scrollHeight,
      onPressCloseButton,
      modalHeight
    } = this.props;
    const { actionLoading, promoCode } = this.state;

    return (
      <Modal
        onModalHide={() => {
          this.onModalHide();
        }}
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isModalOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() => this.onPressBackdrop()}>
        <AlertModal />
        <View style={[styles.modalContent, { height: modalHeight }]}>
          {onPressCloseButton ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressCloseButton}
              style={styles.closeContainer}>
              <Image
                style={styles.close}
                source={images.close}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : null}
          <View style={styles.contentContainer}>
            <View
              style={[styles.scrollViewContainer, { height: scrollHeight }]}>
              <ScrollView>
                <Image
                  style={styles.promoLogo}
                  source={images.logoLarge}
                  resizeMode="cover"
                />
                <AppText textWeight="500" style={styles.instructionsText}>
                  Enter your Gift Card or Promo Code
                </AppText>
                <Input
                  containerStyle={[
                    FormStyles.inputContainer,
                    FormStyles.inputContainerBoldLines,
                  ]}
                  style={FormStyles.inputStyleBold}
                  autoFocus={false}
                  underlineColorAndroid="transparent"
                  maxLength={64}
                  numberOfLines={1}
                  placeholder=""
                  value={promoCode}
                  autoCorrect={false}
                  autoCapitalize={'characters'}
                  keyboardType="default"
                  onSubmitEditing={this.onPressSave}
                  returnKeyType="next"
                  onChangeText={text =>
                    this.setState({ promoCode: text.toUpperCase() })
                  }
                />
              </ScrollView>
            </View>
          </View>
          <View style={styles.cancelLinkContainer}>
            <ButtonLoading
              onPress={this.onPressSave}
              isLoading={actionLoading}
              containerStyle={styles.buttonSignIn}>
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.buttonSignInText}>
                SUBMIT
              </AppText>
            </ButtonLoading>
          </View>
        </View>
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

export default connect(null, mapDispatchToProps)(PromoCodeModal);
