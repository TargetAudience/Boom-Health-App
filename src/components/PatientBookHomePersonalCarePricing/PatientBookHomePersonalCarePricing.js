import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image } from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import {
  CustomHeaderBack,
  LoaderList,
  PriceItem
} from '@components/common';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientBookHomePersonalCarePricing.styles';

import HomePersonalCareApi from '@api/homePersonalCareApi';

import * as HomePersonalCareActions from '@ducks/homePersonalCare';

class PatientBookHomePersonalCarePricing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.navigation.getParam('data', null)
    };
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressItem = item => {
    const { navigation } = this.props;
    const { data } = this.state;

    navigation.navigate('PatientBookHomePersonalCareDaySelect', { item });
  };

  onPressCart = item => {
    const { navigation } = this.props;

    navigation.navigate('PatientBookHomePersonalCareCart');
  };

  renderItem(data, index) {
    const key = data.serviceSubCategoryId;

    return (
      <PriceItem key={key} data={data} handler={() => this.onPressItem(data)} />
    )
  }

  renderItems() {
    const { data } = this.state;
    const { items } = data;

    return (
      <>
        {items.length ? (
          <View style={styles.invitesWrap}>
            {items.map((data, index) => {
              return this.renderItem(data, index);
            })}
          </View>
        ) : null}
      </>
    );
  }

  render() {
    const { cartQuantity } = this.props;
    const { data } = this.state;
    const { category } = data;

    return (
      <SafeAreaView>
        <CustomHeaderBack title={category} onPressBack={this.onPressBack} onPressCart={this.onPressCart} cartItemCount={cartQuantity} />
        <ScrollView style={Globals.background}>
          {this.renderItems()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...HomePersonalCareActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  catalog: state.homePersonalCare.catalog,
  cartQuantity: state.homePersonalCare.cart.quantity
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBookHomePersonalCarePricing);
