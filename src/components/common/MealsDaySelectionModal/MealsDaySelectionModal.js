import React, { Component } from 'react';
import { View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import images from '@assets/images';
import { AppButton, CheckmarkToggle, AppText, LoaderList } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import styles from './MealsDaySelectionModal.styles';

import MealsApi from '@api/mealsApi';

const { width, height } = Dimensions.get('screen');

class MealsDaySelectionModal extends Component {
  constructor(props) {
    super(props);

    let checked = [];
    checked.date = null;
    checked.display = null;

    this.state = {
      days: [],
      checkedItem: checked,
      actionLoading: false
    };
  }

  loadData() {
    const { actions } = this.props;

    this.setState({ actionLoading: true });

    MealsApi.getDeliveryWeeks()
      .promise.then(result => {
        const data = result.data;
        const days = data.days;

        this.onPressCheckmark(days[0]);

        this.setState({ days, actionLoading: false });
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  onModalShow() {
    this.setState({ days: [], actionLoading: true });
    this.loadData();
  }

  onPressBackdrop() {
    const { onPressCloseButton } = this.props;

    onPressCloseButton();

    setTimeout(() => {
      this.setState({ days: [] });
    }, 100);
  }

  onPressSave() {
    const { onPressOne } = this.props;
    const { checkedItem, days } = this.state;

    onPressOne(checkedItem, days);

    setTimeout(() => {
      this.setState({ days: [] });
    }, 100);
  }

  isChecked = item => {
    const { checkedItem } = this.state;

    if (checkedItem.date === item.date) {
      return true;
    }
    return false;
  };

  onPressCheckmark = item => {
    let { checkedItem } = this.state;

    if (checkedItem.date !== item.date) {
      this.setState({ checkedItem: item });
    }
  };

  render() {
    const { isModalOpen, scrollHeight, onPressCloseButton, modalHeight, buttonOneWidth, buttonOneLabel } = this.props;
    const { days, actionLoading } = this.state;

    const showList = !actionLoading;

    return (
      <Modal
        onModalShow={() => this.onModalShow()}
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isModalOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() => this.onPressBackdrop()}>
        <View style={[styles.modalContent, { height: modalHeight }]}>
          {onPressCloseButton ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onPressCloseButton} style={styles.closeContainer}>
              <Image
                style={styles.close}
                source={images.close}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : null}
          <AppText textWeight="600" style={styles.titleText}>Delivery Week</AppText>
          <View style={styles.contentContainer}>
            <View style={[styles.scrollViewContainer, { height: scrollHeight }]}>
              <ScrollView>
                <AppText textWeight="400" style={styles.instructionsText}>Please select when you'd like this item delivered:</AppText>
                <LoaderList loading={actionLoading} />
                {showList ? (
                  <View style={styles.deliveryContainer}>
                    {days.map((item) => {
                      const isChecked = this.isChecked(item);

                      return (
                        <TouchableOpacity key={item.display} activeOpacity={1} onPress={() => this.onPressCheckmark(item)} style={styles.deliveryInner}>
                          <CheckmarkToggle
                            checked={isChecked}
                            onPress={() => this.onPressCheckmark(item)}
                          />
                          <AppText textWeight="400" style={styles.textCheckmark}>{item.display}</AppText>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                ) : null}
              </ScrollView>
            </View>
          </View>
          <View style={styles.cancelLinkContainer}>
            <AppButton
              style={styles.buttonPatient}
              onPress={() => this.onPressSave()}
              width={buttonOneWidth}
              height={36}
              backgroundColor={Colors.buttonMain}
              disabled={false}>
              <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>{buttonOneLabel}</AppText>
            </AppButton>
          </View>
        </View>
      </Modal>
    );
  }
}

export default MealsDaySelectionModal;
