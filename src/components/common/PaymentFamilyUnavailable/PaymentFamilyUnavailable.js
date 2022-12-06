import React, { Component } from 'react';
import { View } from 'react-native';
import { AppText } from '@components/common';
import styles from './PaymentFamilyUnavailable.styles';

class PaymentFamilyUnavailable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.summaryContainer, styles.gap]}>
        <View style={styles.summaryBottomLine}>
          <AppText textWeight="500" style={styles.textCostSummary}>
            Purchase with Family
          </AppText>
        </View>
        <AppText textWeight="300" style={styles.textPurchaseNotice}>
          The family payment feature for Senior Protection is coming soon.
        </AppText>
      </View>
    );
  }
}

export default PaymentFamilyUnavailable;
