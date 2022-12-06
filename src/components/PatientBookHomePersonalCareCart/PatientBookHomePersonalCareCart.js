import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image, Button, Dimensions } from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import moment from 'moment';
import {
  CustomHeaderBack,
  LoaderList,
  PresetMealItem,
  AppButton,
  PresetMealInformation,
  GenericModal,
  CartItemPersonalCare
} from '@components/common';
import { decimalTwoPlaces, uuidv4 } from '@utils/Globals';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientBookHomePersonalCareCart.styles';
import { assetsUrl } from '@lib/Settings';

import HomePersonalCareApi from '@api/homePersonalCareApi';

import * as HomePersonalCareActions from '@ducks/homePersonalCare';
import * as AlertActions from '@ducks/alert';

const { width } = Dimensions.get('screen');

class PatientBookHomePersonalCareCart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions, cartItems } = this.props;

    const time = this.props.navigation.getParam('time', null);
    const timeDisplay = this.props.navigation.getParam('timeDisplay', null);
    const selectedDate = this.props.navigation.getParam('selectedDate', null);
    const pressItem = this.props.navigation.getParam('pressItem', null);
    const timeItem = this.props.navigation.getParam('timeItem', null);

    if (pressItem) {
      const cartItemExists = cartItems.find(value => value.serviceSubCategoryId === pressItem.serviceSubCategoryId && value.date === selectedDate);

      if (cartItemExists) {
        if (cartItemExists && cartItemExists.time !== time) {
          // Change the time
          actions.cartRemoveItem(cartItemExists.itemUuid);
        } else {
          return;
        }
      }

      const itemUuid = uuidv4();

      const dateDisplay = moment(selectedDate).format('ddd, MMMM D, YYYY').toString().toUpperCase();

      const cartItem = {
        itemUuid,
        serviceSubCategoryId: pressItem.serviceSubCategoryId,
        price: pressItem.price,
        quantity: 1,
        name: pressItem.name,
        time,
        timeDisplay,
        date: selectedDate,
        dateDisplay,
        timeItem,
        pressItem
      }

      actions.addToCart(cartItem);
      actions.recalculateCart();
    }
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressCheckout = () => {
    const { navigation, subRole } = this.props;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    navigation.navigate('PatientBookHomePersonalCareCheckout');
  };

  onPressRemoveItem = item => {
    const { actions } = this.props;

    actions.cartRemoveItem(item.itemUuid);
    actions.recalculateCart();
  };

  onPressAddMoreItems = () => {
    const { navigation } = this.props;

    navigation.navigate('PatientBookHomePersonalCare');
  };

  renderFooter() {
    return (
      <>
        <Text style={styles.textUpsell}>Add more personal care services to your order</Text>
        <View style={styles.buttonUpsellContainer}>
          <AppButton
            onPress={this.onPressAddMoreItems}
            width={162}
            height={36}
            backgroundColor={Colors.buttonMain}
            disabled={false}>
            <Text style={styles.buttonUpsellText}>Add More Services</Text>
          </AppButton>
        </View>
      </>
    )
  }

  renderBlankState() {
    return (
      <View style={styles.blankStateContainer}>
        <Image
          style={styles.imageBlankState}
          source={images.shoppingCartLarge}
        />
        <Text style={styles.blankStateText}>You have no items in your cart</Text>
      </View>
    );
  };

  render() {
    const { presetMeals, cartItems, cart } = this.props;

    return (
      <>
        <CustomHeaderBack title="Your Cart" onPressBack={this.onPressBack} />
        {cartItems.length ? (     
          <ScrollView style={styles.scrollView}> 
            {cartItems.map(item => (
              <CartItemPersonalCare 
                key={`${item.itemUuid}`}
                data={item} 
                onPressRemoveItem={()=> this.onPressRemoveItem(item)}
              />
            ))}
            {this.renderFooter()}
          </ScrollView>
        ) : null}
        {cartItems.length ? (
          <View style={styles.bottomContainer}>
            <View style={styles.bottomContainerInner}>
              <Text style={styles.textSubtotal}>Personal Care Subtotal</Text>
              <Text style={styles.textSubtotal}>${cart.subtotal}</Text>
            </View>
            <View style={styles.bottomContainerInnerB}>
              <AppButton
                style={styles.button}
                onPress={this.onPressCheckout}
                width={width - 20}
                height={42}
                backgroundColor={Colors.buttonMain}
                disabled={false}>
                <Text style={styles.buttonText}>CHECKOUT</Text>
              </AppButton>
            </View>
          </View>
        ) : (
          this.renderBlankState()
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...HomePersonalCareActions,
      ...AlertActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  cartItems: state.homePersonalCare.cartItems,
  cart: state.homePersonalCare.cart,
  subRole: state.auth.subRole
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBookHomePersonalCareCart);
