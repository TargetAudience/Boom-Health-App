import React, {Component} from 'react';
import {View, ScrollView, Dimensions, SafeAreaView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  AppButton,
  ImageLoad,
  AppText,
  MealsDaySelectionModal,
} from '@components/common';
import {Colors, Globals} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMealsDetail.styles';
import {photosUrl} from '@lib/Settings';

import * as MealsActions from '@ducks/meals';

const {width} = Dimensions.get('screen');

class PatientMealsDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.navigation.getParam('item', null),
      isModalOpen: false,
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    // //this.mixpanel.track('View Meals Item Detail');
  }

  onPressOpenModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  onPressCancel = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressCart = item => {
    const {navigation} = this.props;

    navigation.navigate('PatientMealsCart');
  };

  onPressWeekSave = (day, weeks) => {
    const {navigation} = this.props;
    const {item} = this.state;

    this.onPressCancel();
    navigation.navigate('PatientMealsCart', {item, day, weeks});
  };

  render() {
    const {cartQuantity} = this.props;
    const {item, isModalOpen} = this.state;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.innerContainer}>
          <CustomHeaderBack
            title={item.name}
            onPressBack={this.onPressBack}
            onPressCart={this.onPressCart}
            cartItemCount={cartQuantity}
          />
          <MealsDaySelectionModal
            onPressOne={this.onPressWeekSave}
            buttonOneLabel="SAVE"
            isModalOpen={isModalOpen}
            onPressCloseButton={this.onPressCancel}
            buttonOneWidth={90}
            modalHeight={390}
            scrollHeight={250}
          />
          <ScrollView style={styles.scrollView}>
            <Card data={item} />
            <View style={styles.extraSpace} />
          </ScrollView>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomContainerInner}>
              <AppButton
                style={styles.button}
                onPress={this.onPressOpenModal}
                width={width - 20}
                height={42}
                backgroundColor={Colors.buttonMain}
                disabled={false}>
                <View style={styles.buttonTextContainer}>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={styles.buttonText}>
                    ADD TO ORDER
                  </AppText>
                  <AppText
                    textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                    style={[styles.buttonText, styles.alignRight]}>
                    ${item.price}
                  </AppText>
                </View>
              </AppButton>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const Card = ({data}) => {
  const thumb = `${photosUrl}meals/${data.image}`;

  return (
    <View style={styles.cardContainer}>
      <ImageLoad
        emptyBg={images.foodPlaceholder}
        style={styles.imageMain}
        source={{uri: thumb}}
      />
      <View>
        <AppText textWeight="600" style={styles.textName}>
          {data.name}
        </AppText>
        <AppText textWeight="300" style={styles.textDescription}>
          {data.ingredients}
        </AppText>
        <AppText textWeight="600" style={styles.textCardSubtitle}>
          Nutrition Information
        </AppText>
        <AppText textWeight="300" style={styles.textCardNutrition}>
          {data.nutritionRegular}
        </AppText>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...MealsActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  cartQuantity: state.meals.cart.quantityOfItems,
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientMealsDetail);
