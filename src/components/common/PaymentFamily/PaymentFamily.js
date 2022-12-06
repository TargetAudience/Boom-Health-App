import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { CheckmarkToggle, AppText } from '@components/common';
import styles from './PaymentFamily.styles';

import ProfileApi from '@api/profileApi';

class PaymentFamily extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false,
      familyMembers: [],
      checkedList: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { selectedFamilyMembersReset } = this.props;

    if (
      prevProps.selectedFamilyMembersReset !== selectedFamilyMembersReset &&
      selectedFamilyMembersReset
    ) {
      this.setState({ checkedList: [] });
    }
  }

  loadData() {
    this.setState({ actionLoading: true });

    ProfileApi.getFamilyMembersPaymentCard()
      .promise.then(result => {
        const data = result.data.users;

        this.setState({ familyMembers: data, actionLoading: false });
        this.forceUpdate();
      })
      .catch(error => {
        this.setState({ actionLoading: false });
      });
  }

  onPressCheckmark = item => {
    const { selectedFamilyCallback } = this.props;
    let { checkedList } = this.state;

    if (checkedList.indexOf(item) == -1) {
      checkedList.push(item);
      this.setState({ checkedList });
    } else {
      checkedList = checkedList.filter(i => i != item);
      this.setState({ checkedList });
    }
    selectedFamilyCallback(checkedList);
  };

  isChecked = item => {
    const { checkedList } = this.state;
    if (checkedList.indexOf(item) == -1) {
      return false;
    }
    return true;
  };

  renderRowItem = (data, index, itemsLength) => {
    const isChecked = this.isChecked(data.userId);
    const extraStyle =
      index === itemsLength - 1 ? styles.checkmarkRemoveGap : null;

    return (
      <TouchableWithoutFeedback
        key={data.userId}
        onPress={() => this.onPressCheckmark(data.userId)}>
        <View style={[styles.checkmarkContainer, extraStyle]}>
          <CheckmarkToggle
            checked={isChecked}
            onPress={() => this.onPressCheckmark(data.userId)}
          />
          <AppText textWeight="500" style={styles.textCheckmark}>
            {data.firstName} {data.lastName}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderFamilyMembers() {
    const { familyMembers } = this.state;

    return (
      <>
        {familyMembers.length ? (
          <View style={styles.invitesWrap}>
            {familyMembers.map((data, index) => {
              return this.renderRowItem(data, index, familyMembers.length);
            })}
          </View>
        ) : (
          <AppText textWeight="500" style={styles.textNone}>
            You have no registered family members
          </AppText>
        )}
      </>
    );
  }

  render() {
    const { actionLoading, familyMembers } = this.state;

    const renderMain = !actionLoading;

    if (familyMembers.length) {
      return (
        <View style={[styles.summaryContainer, styles.gap]}>
          <View style={styles.summaryBottomLine}>
            <AppText textWeight="500" style={styles.textCostSummary}>
              Purchase with Family
            </AppText>
          </View>
          <View>{renderMain ? this.renderFamilyMembers() : null}</View>
          <AppText textWeight="300" style={styles.textPurchaseNotice}>
            The payment will be split equally among yourself and any checked
            family members.
          </AppText>
        </View>
      );
    }
    return null;
  }
}

export default PaymentFamily;
