import React, {Component} from 'react';
import {View, Image, Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SafeAreaView from 'react-native-safe-area-view';
import RNPrint from 'react-native-print';
//import MixpanelManager from '@utils/Analytics';
import {CustomHeaderBack, LoaderList, ScreenWrapper} from '@components/common';
import images from '@assets/images';
import styles from './PaymentHistory.styles';
import PaymentHistoryPanel from './PaymentHistoryPanel';

import PaymentHistoryApi from '@api/paymentHistoryApi';
import DocumentsApi from '@api/documentsApi';

import * as TodaysAppointmentsActions from '@ducks/todaysAppointments';
import * as AlertActions from '@ducks/alert';

class PaymentHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: true,
      orders: [],
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadApiData();

    //this.mixpanel.track('View Order History');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack();
  };

  onPressView = item => {
    const {navigation} = this.props;
    navigation.navigate('PdfPage', {item});
  };

  onPressPrint = async item => {
    const {actions} = this.props;

    DocumentsApi.getPdf({item})
      .promise.then(async result => {
        const fileName = result.data.fileUrl;

        await RNPrint.print({filePath: fileName});
      })
      .catch(error => {
        console.log('Order History error', error);
        actions.setAlert(error.data.error);
      });
  };

  onPressSend = item => {
    const {actions} = this.props;

    actions.setAlert(
      'Your receipt has been sent. Please check your email for a link to your receipt.',
      'mediumDuration',
    );

    DocumentsApi.emailDocument({item})
      .promise.then(result => {})
      .catch(error => {});
  };

  loadApiData = () => {
    const {actions} = this.props;

    this.setState({actionLoading: true});

    PaymentHistoryApi.getPaymentHistory()
      .promise.then(result => {
        const orders = result.data.orders;

        this.setState({orders, actionLoading: false});
      })
      .catch(error => {
        console.log('Order History error', error);
        this.setState({actionLoading: false});
        actions.setAlert(error.data.error);
      });
  };

  renderBlankState = () => {
    const {orders, actionLoading} = this.state;

    if (!orders.length && !actionLoading) {
      return (
        <View style={styles.blankStateContainer}>
          <Image
            style={styles.dateTimeIcon}
            source={images.orderHistory}
            resizeMode="cover"
          />
          <Text style={styles.blankStateText}>
            You have nothing yet in your order history.
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  renderItem = data => {
    const item = data.item;

    return (
      <PaymentHistoryPanel
        key={`key_${item.customerOrderId}`}
        onPressSend={this.onPressSend}
        onPressView={this.onPressView}
        onPressPrint={this.onPressPrint}
        item={item}
      />
    );
  };

  render() {
    const {orders, actionLoading} = this.state;

    return (
      <ScreenWrapper>
        <CustomHeaderBack
          title="Order History"
          onPressBack={this.onPressBack}
        />
        <LoaderList loading={actionLoading} />
        <FlatList
          ref={ref => {
            this.listRef = ref;
          }}
          data={orders}
          initialNumToRender={5}
          maxToRenderPerBatch={30}
          windowSize={101}
          onEndReachedThreshold={1200}
          disableVirtualization={false}
          bounces
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          scrollEventThrottle={1}
          removeClippedSubviews
          automaticallyAdjustContentInsets={false}
          keyExtractor={item => item.purchaseId}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderBlankState}
        />
      </ScreenWrapper>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...TodaysAppointmentsActions,
      ...AlertActions,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistory);
