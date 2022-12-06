import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Platform, Image, Animated, Easing } from 'react-native';
import RNCollapsible from 'react-native-collapsible';
import { AppText, AppButtonIcon } from '@components/common';
import { Colors, Globals, FormStyles } from '@constants/GlobalStyles';
import { normalizeFont } from '@utils/Responsive';
import images from '@assets/images';

class PaymentHistoryPanel extends Component {
  constructor(props) {
    super(props);

    this.rotateValue = new Animated.Value(0);

    this.state = {
      actionLoadingPrint: false
    };
  }

  onPressSend = () => {
    const { item, onPressSend } = this.props;
    onPressSend(item);
  };

  onPressView = () => {
    const { item, onPressView } = this.props;
    onPressView(item);
  };

  onPressPrint = () => {
    const { item, onPressPrint } = this.props;
    onPressPrint(item);
    this.setState({ collapsed: false, actionLoadingPrint: true });
    setTimeout(() => {
      this.setState({ actionLoadingPrint: false });
    }, 2000);
  };

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  renderNotAvailable = pending => {
    const { item } = this.props;

    if (pending) {
      return (
        <View style={styles.notAvailableContainer}>
          <AppText textWeight={'300'} style={styles.textMessage}>
            No receipts are available for pending orders.
          </AppText>
        </View>
      );
    }

    if (!item.documentAvailable) {
      return (
        <View style={styles.notAvailableContainer}>
          <AppText textWeight={'300'} style={styles.textMessage}>
            No receipts are available for this order. Please contact Boom if you'd like a PDF receipt.
          </AppText>
        </View>
      );
    }
    return null;
  };

  render() {
    const { item } = this.props;
    const { actionLoadingPrint } = this.state;

    let total,
      pending = false;

    if (item.vertical === 'transportation' && item.total === '0.00') {
      total = 'Pending';
      pending = true;
    } else {
      total = '$' + item.total;
    }

    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.toggle}
          activeOpacity={0.8}
          style={styles.innerContainer}
          underlayColor={Colors.white}>
          <>
            <View>
              <AppText textWeight={`${Platform.OS === 'ios' ? '500' : '400'}`} style={styles.titleText}>
                Boom {item.verticalFriendly}
              </AppText>
              <View style={styles.iconContainer}>
                <Image style={styles.iconCalendar} source={images.calendar} />
                <AppText textWeight={`${Platform.OS === 'ios' ? '500' : '400'}`} style={styles.iconText}>
                  {item.createOn}
                </AppText>
              </View>
              <AppText textWeight={`${Platform.OS === 'ios' ? '500' : '400'}`} style={styles.labelText}>
                Order Number: <AppText textWeight="300">{item.customerOrderId}</AppText>
              </AppText>
              <AppText textWeight={`${Platform.OS === 'ios' ? '500' : '400'}`} style={styles.labelText}>
                Total: <AppText textWeight="300">{total}</AppText>
              </AppText>
            </View>
            <View >
              <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
          </>
        </TouchableHighlight>

        <View>
          {item.documentAvailable ? (
            <View style={styles.buttonContainer}>
              <View style={styles.buttonContainerInner}>
                <AppButtonIcon
                  onPress={this.onPressSend}
                  containerStyle={FormStyles.buttonHalf}
                  containerDisabledStyle={FormStyles.buttonHalfDisabled}
                  icon={images.iconMail}
                  iconStyle={styles.iconButton}
                  disabled={pending}>
                  <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={FormStyles.buttonText}>
                    Send
                  </AppText>
                </AppButtonIcon>
              </View>
              <View style={styles.buttonContainerInner}>
                <AppButtonIcon
                  activityPink={false}
                  isLoading={actionLoadingPrint}
                  onPress={this.onPressPrint}
                  containerStyle={FormStyles.buttonHalf}
                  containerDisabledStyle={FormStyles.buttonHalfDisabled}
                  icon={images.iconPrint}
                  iconStyle={styles.iconButton}
                  disabled={pending || actionLoadingPrint}>
                  <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={FormStyles.buttonText}>
                    Print
                  </AppText>
                </AppButtonIcon>
              </View>
              <View style={styles.buttonContainerInner}>
                <AppButtonIcon
                  onPress={this.onPressView}
                  containerStyle={FormStyles.buttonHalf}
                  containerDisabledStyle={FormStyles.buttonHalfDisabled}
                  icon={images.iconView}
                  iconStyle={styles.iconButton}
                  disabled={pending}>
                  <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={FormStyles.buttonText}>
                    View
                  </AppText>
                </AppButtonIcon>
              </View>
            </View>
          ) : (
            this.renderNotAvailable(pending)
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notAvailableContainer: {
    marginTop: 10
  },
  textMessage: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginTop: 5,
    color: '#1c1c1c',
    lineHeight: 19
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: Colors.listRowSpacer,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    marginBottom: 12,
    color: '#1c1c1c',
    fontSize: Platform.OS === 'ios' ? 15 : normalizeFont(15)
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  iconCalendar: {
    width: 25,
    height: 25,
    marginRight: 3,
    marginTop: 1
  },
  iconText: {
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 20,
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    color: '#1c1c1c'
  },
  labelText: {
    fontSize: Platform.OS === 'ios' ? 14.5 : normalizeFont(14.5),
    marginTop: 5,
    color: '#1c1c1c'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between'
  },
  buttonContainerInner: {
    flex: 1
  },
  iconButton: {
    width: 18,
    height: 18,
    marginRight: 8
  }
});

export default PaymentHistoryPanel;
