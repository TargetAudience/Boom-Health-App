import React, {Component} from 'react';
import {View, ScrollView, Image, Dimensions} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  AppButton,
  CartItem,
  AppText,
  RentalModalB,
} from '@components/common';
import {currencyFormat} from '@utils/Globals';
import {Colors} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMedicalEquipmentCart.styles';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import * as EquipmentActions from '@ducks/equipment';
import * as AlertActions from '@ducks/alert';

const {width} = Dimensions.get('screen');

class PatientMedicalEquipmentCart extends Component {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const {actions, cartItems} = this.props;

    const pressItem = this.props.navigation.getParam('pressItem', null);
    const data = this.props.navigation.getParam('data', null);
    const selectedRentalItem = this.props.navigation.getParam(
      'selectedRentalItem',
      null,
    );
    const selectedSizeItem = this.props.navigation.getParam(
      'selectedSizeItem',
      null,
    );

    if (pressItem) {
      const type = data.id === 1 ? 'rent' : 'buy';

      const rentItemExists = cartItems.find(
        value => value.itemUuid === pressItem.itemUuid && value.type === 'rent',
      );

      if (type === 'rent' && rentItemExists) {
        if (
          rentItemExists.nickname === selectedRentalItem.duration &&
          rentItemExists.size === selectedSizeItem?.size
        ) {
          return;
        } else if (
          rentItemExists.nickname !== selectedRentalItem.duration ||
          rentItemExists.size !== selectedSizeItem?.size
        ) {
          actions.cartRemoveItem(pressItem.itemUuid);
        }
      }

      let price = type === 'rent' ? selectedRentalItem.price : pressItem.price;

      const delivery = pressItem.delivery;
      const rushDelivery = pressItem.rushDelivery;

      const cartItem = {
        uuid: pressItem.itemUuid,
        categoryId: pressItem.categoryId,
        itemUuid: pressItem.itemUuid,
        price,
        priceTally: price,
        quantity: 1,
        name: pressItem.name,
        size: selectedSizeItem?.size ? selectedSizeItem.size : null,
        sizeId: selectedSizeItem?.size ? selectedSizeItem.sizeId : null,
        durationDays: type === 'rent' ? selectedRentalItem.durationDays : null,
        duration: type === 'rent' ? selectedRentalItem.duration : null,
        nickname: type === 'rent' ? selectedRentalItem.duration : null,
        type,
        cartType: 'equipment',
        delivery,
        rushDelivery,
        cartItemType: 'normal',
      };

      actions.addToCart(cartItem);
      actions.recalculateCartEquipment();
    } else {
      actions.recalculateCartEquipment();
    }

    //('View Medical Equipment Cart');
  }

  onPressOpenModal = () => {
    this.setState({
      isRentalModalOpen: true,
    });
  };

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressCheckout = () => {
    const {navigation, subRole, cartItems, actions} = this.props;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    let showAlert = false;
    cartItems.forEach(item => {
      if (item.type === 'rent' && !Number(item.durationDays)) {
        showAlert = true;
      }
    });

    if (showAlert) {
      actions.setAlert(
        'Please be sure to select the length of rental for each item in your cart.',
      );
      return;
    }

    navigation.navigate('PatientMedicalEquipmentCheckout');
  };

  onPressRemoveItem = item => {
    const {actions} = this.props;

    actions.cartRemoveItem(item.itemUuid);
    actions.recalculateCartEquipment();
  };

  onPressIncrement = item => {
    const {actions} = this.props;

    if (item.quantity < 99) {
      actions.cartIncrement({itemUuid: item.itemUuid, itemType: item.type});
      actions.recalculateCartEquipment();
    }
  };

  onPressDecrement = item => {
    const {actions} = this.props;

    if (item.quantity > 1) {
      actions.cartDecrement({itemUuid: item.itemUuid, itemType: item.type});
      actions.recalculateCartEquipment();
    }
  };

  onPressAddMoreItems = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientMedicalEquipment');
  };

  onPressItemDurationChange = (item, selectedChange) => {
    const {actions} = this.props;

    actions.changeLengthOfRental({item, selectedChange});
    actions.recalculateCartEquipment();
  };

  renderFooter() {
    return (
      <>
        <AppText textWeight="300" style={styles.textUpsell}>
          Add more equipment purchases or rentals to your order
        </AppText>
        <View style={styles.buttonUpsellContainer}>
          <AppButton
            onPress={this.onPressAddMoreItems}
            width={146}
            height={36}
            backgroundColor={Colors.buttonMain}
            disabled={false}>
            <AppText
              textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
              style={styles.buttonUpsellText}>
              Add More Items
            </AppText>
          </AppButton>
        </View>
      </>
    );
  }

  renderBlankState() {
    return (
      <View style={styles.blankStateContainer}>
        <Image
          style={styles.imageBlankState}
          source={images.shoppingCartLarge}
        />
        <AppText textWeight="300" style={styles.blankStateText}>
          You have no items in your cart
        </AppText>
      </View>
    );
  }

  render() {
    const {cartItems, cart} = this.props;

    const carts = cartItems.map(item => {
      return (
        <CartItem
          key={`${item.itemUuid}`}
          data={item}
          onPressIncrement={() => this.onPressIncrement(item)}
          onPressDecrement={() => this.onPressDecrement(item)}
          onPressRemoveItem={() => this.onPressRemoveItem(item)}
          onPressItemDurationChange={selectedChange =>
            this.onPressItemDurationChange(item, selectedChange)
          }
        />
      );
    });

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            <CustomHeaderBack
              title="Your Cart"
              onPressBack={this.onPressBack}
            />
            {cartItems.length ? (
              <ScrollView style={styles.containerB}>
                {carts}
                {this.renderFooter()}
              </ScrollView>
            ) : null}
            {cartItems.length ? (
              <View style={styles.bottomContainer}>
                <View style={styles.bottomContainerInner}>
                  <AppText textWeight="500" style={styles.textSubtotal}>
                    Equipment Subtotal
                  </AppText>
                  <AppText textWeight="500" style={styles.textSubtotal}>
                    {currencyFormat(cart.subtotal)}
                  </AppText>
                </View>
                <View style={styles.bottomContainerInnerB}>
                  <AppButton
                    style={styles.button}
                    onPress={this.onPressCheckout}
                    width={width - 20}
                    height={42}
                    backgroundColor={Colors.buttonMain}
                    disabled={false}>
                    <AppText
                      textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                      style={styles.buttonText}>
                      CHECKOUT
                    </AppText>
                  </AppButton>
                </View>
              </View>
            ) : (
              this.renderBlankState()
            )}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions,
      ...EquipmentActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  cartItems: state.equipment.cartItems,
  cart: state.equipment.cart,
  subRole: state.auth.subRole,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientMedicalEquipmentCart);
