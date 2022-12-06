import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  LoaderList,
  ImageLoad,
  AppText,
} from '@components/common';
import analytics from '@react-native-firebase/analytics';
import {Globals, Colors} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMeals.styles';

import {photosUrl} from '@lib/Settings';

import MealsApi from '@api/mealsApi';

import * as AlertActions from '@ducks/alert';
import * as MealsActions from '@ducks/meals';

class PatientMeals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false,
      meals: [],
    };

    this.onPressMealsDetail = this.onPressMealsDetail.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();
    analytics().logScreenView({
      screen_name: 'meals_home',
      screen_class: 'meals_home',
    });
    // //this.mixpanel.track('View Meals Home');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressMealsDetail = item => {
    const {navigation} = this.props;

    navigation.navigate('PatientMealsDetail', {item});
  };

  onPressCart = item => {
    const {navigation} = this.props;

    navigation.navigate('PatientMealsCart');
  };

  loadData = () => {
    const {actions} = this.props;

    this.setState({actionLoading: true});

    setTimeout(() => {
      MealsApi.getWeeklyMenu()
        .promise.then(result => {
          const data = result.data;
          const meals = data.meals;

          this.setState({meals, actionLoading: false});
        })
        .catch(error => {
          this.setState({actionLoading: false});
          actions.setAlert(error.data.error);
        });
    }, 300);
  };

  renderItem = (item, index) => {
    const thumb = `${photosUrl}meals/${item.thumbnail}`;

    return (
      <TouchableOpacity
        key={item.key}
        style={styles.itemContainer}
        activeOpacity={0.8}
        onPress={() => this.onPressMealsDetail(item)}>
        <View style={styles.thumbnail}>
          <ImageLoad
            emptyBg={images.foodPlaceholder}
            style={styles.imageThumb}
            source={{uri: thumb}}
          />
        </View>
        <View style={styles.detail}>
          <AppText textWeight="500" style={styles.name}>
            {item.name}
          </AppText>
        </View>
        <View style={styles.priceContainer}>
          <AppText textWeight="600" style={styles.textPrice}>
            ${item.price}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  renderSection = (item, index) => {
    const items = item.data;

    return (
      <View key={`key_${item.title}`}>
        <AppText textWeight="600" style={styles.textWeekHeading}>
          {item.title}
        </AppText>
        {items.map((data, index) => {
          return this.renderItem(data, index);
        })}
      </View>
    );
  };

  renderItems = menu => {
    return (
      <>
        {menu
          ? menu.map((data, index) => {
              return this.renderSection(data, index);
            })
          : null}
      </>
    );
  };

  render() {
    const {cartQuantity} = this.props;
    const {actionLoading, meals} = this.state;

    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.container, {paddingTop: insets.top}]}>
              <CustomHeaderBack
                title="Order Meals"
                onPressBack={this.onPressBack}
                onPressCart={this.onPressCart}
                cartItemCount={cartQuantity}
              />
              <ScrollView style={styles.containerB}>
                <>
                  <View style={styles.introContainer}>
                    <View style={styles.leafContainer}>
                      <Image style={styles.leaf} source={images.leaf} />
                      <AppText textWeight="400" style={styles.leafText}>
                        Freshly prepared meals - perfect for families, adults,
                        and kids! Simply reheat and enjoy.*
                      </AppText>
                    </View>
                    <View style={styles.introBackground}>
                      <AppText textWeight="600" style={styles.textIntroTitle}>
                        Your First Boom Meals Order
                      </AppText>
                    </View>
                    <AppText textWeight="300" style={styles.textIntro}>
                      Please select a minimum of 6 meals per order delivery
                      week. You can select which week and, during checkout, what
                      day you'd like your order delivered. You can change
                      quantities in your cart.
                    </AppText>
                    <View style={[styles.introBackground, styles.gapTop]}>
                      <AppText textWeight="600" style={styles.textIntroTitle}>
                        Delivery
                      </AppText>
                    </View>
                    <AppText textWeight="300" style={styles.textIntro}>
                      Choose your delivery week. Tuesday and Friday delivery
                      days available.
                    </AppText>
                  </View>
                  <LoaderList loading={actionLoading} />
                  {!actionLoading ? this.renderItems(meals) : null}
                  <AppText textWeight="300" style={styles.textSubstitutions}>
                    * Substitutions may be necessary due to seasonal
                    availability.
                  </AppText>
                </>
              </ScrollView>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
      </>
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
  weeklyMenu: state.meals.weeklyMenu,
  cartQuantity: state.meals.cart.quantityOfItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientMeals);
