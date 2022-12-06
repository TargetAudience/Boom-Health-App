import React, {Component} from 'react';
import {View, ScrollView, Image, Dimensions, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  AppButton,
  AllergiesModal,
  CartItem,
  AppText,
} from '@components/common';
import {currencyFormat} from '@utils/Globals';
import {Colors} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMealsCart.styles';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import * as AlertActions from '@ducks/alert';
import * as MealsActions from '@ducks/meals';

const {width} = Dimensions.get('screen');

class PatientMealsCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAllergiesModalOpen: false,
    };
    
    this.onPressCloseSave = this.onPressCloseSave.bind(this);
    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const {actions} = this.props;

    const item = this.props.navigation.getParam('item', null);
    const day = this.props.navigation.getParam('day', null);
    const weeks = this.props.navigation.getParam('weeks', null);

    if (item) {
      const cartItem = {
        mealItemId: item.mealItemId,
        price: Number(item.price),
        priceTally: Number(item.price),
        quantity: 1,
        name: item.name,
        week: day.date,
        weekDisplay: day.display,
        isThisWeek: day.isThisWeek,
        type: 'buy',
        cartType: 'meals',
        cartTypeLabel: 'meal',
        delivery: 0,
        thumbnail: item.thumbnail,
      };

      const defaultDietary = {
        checkedGluten: false,
        checkedDairyCow: false,
        checkedDairySheep: false,
        checkedNuts: false,
        checkedShellfish: false,
        checkedPork: false,
        checkedLowFibre: false,
      };
      actions.setDietaryRestrictions({allergiesState: defaultDietary, allergiesCount: 0});
      actions.addToCartMeals({cartItem, weeks});

      actions.recalculateCart();
    }

    //this.mixpanel.track('View Meals Cart');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressCheckout = () => {
    const {actions, navigation, cartItemsMeals, subRole} = this.props;

    if (subRole === 'guest') {
      navigation.navigate('SignUpLanding');
      return;
    }

    let showAlert = false;
    for (var key in cartItemsMeals) {
      let dayMealsCount = 0;
      const day = cartItemsMeals[key];

      day.forEach((meals, index) => {
        dayMealsCount += meals.quantity;
      });

      if (dayMealsCount < 6) {
        showAlert = true;
      }
    }

    if (showAlert) {
      actions.setAlert(
        'Please be sure to add at least 6 meals for a delivery week (our minimum order).',
      );
      return;
    }

    navigation.navigate('PatientMealsCheckout');
  };

  onPressCloseSave = ({ allergiesState, allergiesCount }) => {
    const {actions} = this.props;
    actions.setDietaryRestrictions({allergiesState, allergiesCount});
    this.onPressCancel();
  };

  onPressCancel = () => {
    this.setState({
      isAllergiesModalOpen: false,
    });
  };

  onPressAllergies = () => {
    this.setState({
      isAllergiesModalOpen: true,
    });
  };

  onPressAdditionalMeals = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientMeals');
  };

  onPressRemoveItem = item => {
    const {actions} = this.props;

    actions.cartRemoveItem(item);
    actions.recalculateCart();
  };

  onPressIncrement = item => {
    const {actions} = this.props;

    if (item.quantity < 99) {
      actions.cartIncrement(item);
      actions.recalculateCart();
    }
  };

  onPressDecrement = item => {
    const {actions} = this.props;

    if (item.quantity > 1) {
      actions.cartDecrement(item);
      actions.recalculateCart();
    }
  };

  renderBlankState() {
    return (
      <View style={styles.blankStateContainer}>
        <Image style={styles.imageBlankState} source={images.blankStateCart} />
        <AppText textWeight="300" style={styles.blankStateText}>
          You have no items in your bag
        </AppText>
      </View>
    );
  }

  renderItem = item => {
    return item.map(item => {
      return (
        <CartItem
          key={item.mealItemId}
          data={item}
          onPressIncrement={() => this.onPressIncrement(item)}
          onPressDecrement={() => this.onPressDecrement(item)}
          onPressRemoveItem={() => this.onPressRemoveItem(item)}
        />
      );
    });
  };

  renderMeals(item, index) {
    const {cartItemsMeals} = this.props;

    return (
      <View>
        {Object.keys(cartItemsMeals)
          .sort()
          .map(key => {
            const day = cartItemsMeals[key];
            const weekDisplay = day[0].weekDisplay;

            return (
              <View key={`key_${key.toString()}`}>
                <View style={styles.headerContainer}>
                  <AppText textWeight="600" style={styles.header}>
                    {weekDisplay}
                  </AppText>
                  <AppText textWeight="400" style={styles.subHeaderText}>
                    Minimum order 6 items
                  </AppText>
                </View>
                {this.renderItem(day)}
              </View>
            );
          })}
      </View>
    );
  }

  render() {
    const {cartItemsMeals, cart, allergiesCount} =
      this.props;
    const {isAllergiesModalOpen} = this.state;

    let allergiesMessage = '';
    if (allergiesCount === 0) {
      allergiesMessage = 'You have none set';
    } else if (allergiesCount === 1) {
      allergiesMessage = 'You have one set';
    } else {
      allergiesMessage = 'You have some set';
    }

    const showCart = Object.keys(cartItemsMeals).length ? true : false;
    const styleBottom = !showCart ? styles.removePadding : '';

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View
            style={[
              styles.container,
              {paddingTop: insets.top, paddingBottom: insets.bottom},
            ]}>
            <CustomHeaderBack
              title="Your Cart"
              onPressBack={this.onPressBack}
            />
            <AllergiesModal
              onPressCloseSave={this.onPressCloseSave}
              onPressClose={this.onPressCancel}
              buttonOneLabel="SAVE"
              isModalOpen={isAllergiesModalOpen}
              titleText="Dietary Restrictions"
              buttonOneWidth={90}
              modalHeight={390}
              scrollHeight={250}
            />
            <ScrollView style={[styles.containerB, styleBottom]}>
              {showCart ? (
                <>
                  {cartItemsMeals.length ? (
                    <View style={styles.headerContainer}>
                      <AppText textWeight="600" style={styles.header}>
                        This Week's Menu
                      </AppText>
                      <AppText textWeight="400" style={styles.subHeaderText}>
                        Minimum order 6 meals
                      </AppText>
                    </View>
                  ) : null}
                  {this.renderMeals()}
                  <AppText textWeight="300" style={styles.textUpsell}>
                    Try different meals by adding additional selections to your
                    order
                  </AppText>
                  <View style={styles.buttonUpsellContainer}>
                    <AppButton
                      backgroundColor={Colors.buttonMain}
                      onPress={this.onPressAdditionalMeals}
                      width={188}
                      height={36}
                      disabled={false}>
                      <AppText
                        textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                        style={styles.buttonUpsellText}>
                        Add Additional Items
                      </AppText>
                    </AppButton>
                  </View>
                </>
              ) : null}
            </ScrollView>
            {showCart ? (
              <View style={styles.bottomContainer}>
                <View style={styles.bottomContainerInnerA}>
                  <AppButton
                    style={styles.buttonAllergiesButton}
                    onPress={this.onPressAllergies}
                    height={36}
                    disabled={false}>
                    <AppText
                      textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                      style={styles.buttonTextB}>
                      PICK DIETARY RESTRICTIONS
                    </AppText>
                  </AppButton>
                  <AppText textWeight="500" style={styles.textAllergiesMessage}>
                    {allergiesMessage}
                  </AppText>
                </View>
                <View style={styles.bottomContainerInner}>
                  <AppText textWeight="500" style={styles.textSubtotal}>
                    Meal Plan Subtotal
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
      ...MealsActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  cartItemsMeals: state.meals.cartItemsMeals,
  cart: state.meals.cart,
  dietaryRestrictions: state.meals.dietaryRestrictions,
  allergiesCount: state.meals.allergiesCount,
  subRole: state.auth.subRole,
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientMealsCart);
