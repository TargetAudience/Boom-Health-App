import React, {Component} from 'react';
import {View, ScrollView, Image, Dimensions, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import reactStringReplace from 'react-string-replace';
import {decode} from 'html-entities';
import {
  CustomHeaderBack,
  ImageLoad,
  AppButton,
  RentalModal,
  SizeModal,
  AppText,
} from '@components/common';
import {Colors} from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMedicalEquipmentRentalItemDetail.styles';
import {assetsUrl} from '@lib/Settings';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import * as EquipmentActions from '@ducks/equipment';
import * as AlertActions from '@ducks/alert';

const {width} = Dimensions.get('screen');

class PatientMedicalEquipmentRentalItemDetail extends Component {
  constructor(props) {
    super(props);

    const pressItem = props.navigation.getParam('pressItem', null);
    const item = props.navigation.getParam('item', null);
    const data = props.navigation.getParam('data', null);

    this.state = {
      pressItem,
      item,
      data,
      rentChecked: false,
      buyChecked: false,
      orderAmount: null,
      selectedSizeItem: null,
      isRentalModalOpen: false,
      isSizeModalOpen: false,
      selectedRentalItem: null,
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Medical Equipment Rental Item Detail');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressOrder = () => {
    const {navigation, actions} = this.props;
    const {item, data, pressItem, selectedRentalItem, selectedSizeItem} =
      this.state;

    if (pressItem.hasSizes === 1 && !selectedSizeItem) {
      actions.setAlert('Please select your rental item size.');
      return;
    }

    if (!selectedRentalItem) {
      actions.setAlert('Please select a rental length.');
      return;
    }

    navigation.navigate('PatientMedicalEquipmentCart', {
      item,
      data,
      pressItem,
      selectedRentalItem,
      selectedSizeItem,
    });
  };

  onPressRent = () => {
    this.setState({
      isRentalModalOpen: true,
      rentChecked: true,
      buyChecked: false,
      orderAmount: null,
    });
  };

  onPressSize = () => {
    this.setState({isSizeModalOpen: true});
  };

  onPressCloseModal = () => {
    this.setState({isRentalModalOpen: false, isSizeModalOpen: false});
  };

  onPressItemPress = item => {
    this.setState({isRentalModalOpen: false, selectedRentalItem: item});
  };

  onPressSizeItemPress = item => {
    this.setState({isSizeModalOpen: false, selectedSizeItem: item});
  };

  onPressCart = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientMedicalEquipmentCart');
  };

  renderButtons() {
    const {pressItem, selectedRentalItem, selectedSizeItem} = this.state;

    const price = selectedRentalItem ? `$${selectedRentalItem.price}` : '-';
    const size = selectedSizeItem ? `${selectedSizeItem.size}` : '-';

    const sizeButton = (
      <AppButton
        style={[styles.button, styles.buttonTop]}
        onPress={() => this.onPressSize(pressItem)}
        width={width - 40}
        height={42}
        backgroundColor={Colors.grayButton}
        disabled={false}>
        <View style={styles.buttonTextContainer4}>
          <AppText
            textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
            style={styles.buttonBuyText4}>
            SELECT SIZE
          </AppText>
          <AppText
            textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
            style={[styles.buttonText, styles.alignRight]}>
            {size}
          </AppText>
        </View>
      </AppButton>
    );

    const rentButton = (
      <AppButton
        style={[styles.button, styles.buttonSizingB]}
        onPress={() => this.onPressRent(pressItem)}
        width={width - 40}
        height={42}
        backgroundColor={Colors.buttonMain}
        disabled={false}>
        <View style={styles.buttonTextContainer3}>
          <AppText
            textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
            style={styles.buttonBuyText2}>
            SELECT LENGTH OF RENTAL
          </AppText>
          <AppText
            textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
            style={[styles.buttonText, styles.alignRight]}>
            {price}
          </AppText>
        </View>
      </AppButton>
    );

    return (
      <View style={styles.midButtonsContainer}>
        {pressItem.hasSizes === 1 ? sizeButton : null}
        {rentButton}
      </View>
    );
  }

  render() {
    const {cartQuantity} = this.props;
    const {
      item,
      pressItem,
      isRentalModalOpen,
      isSizeModalOpen,
      selectedRentalItem,
      selectedSizeItem,
    } = this.state;

    const thumb = `${assetsUrl}images/equipment/${pressItem.featureImage}`;

    const orderPrice = selectedRentalItem ? selectedRentalItem.price : '';
    const selected = selectedRentalItem ? selectedRentalItem.optionId : null;
    const selectedSize = selectedSizeItem ? selectedSizeItem.sizeId : null;

    const noImage = !pressItem.featureImage
      ? styles.imageThumbContainerNoImage
      : null;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom}]}>
            <CustomHeaderBack
              title={item.name}
              onPressBack={this.onPressBack}
              onPressCart={this.onPressCart}
              cartItemCount={cartQuantity}
            />
            <ScrollView style={styles.containerB}>
              <View style={[styles.imageThumbContainer, noImage]}>
                <ImageLoad
                  emptyBg={images.placeholderEquipment}
                  style={styles.imageThumb}
                  source={{uri: thumb}}
                />
              </View>
              <AppText textWeight="600" style={styles.itemNameText}>
                {pressItem.name}
              </AppText>
              {this.renderButtons()}
              <AppText textWeight="300" style={styles.descriptionTextContainer}>
                {reactStringReplace(
                  decode(pressItem.description),
                  '(*)',
                  (item, i) => (
                    <Image
                      key={i}
                      style={styles.bullet}
                      source={images.bulletOrange}
                    />
                  ),
                )}
              </AppText>
            </ScrollView>
            <View style={styles.bottomContainer}>
              <View style={styles.bottomContainerInner}>
                <AppButton
                  style={styles.button}
                  onPress={this.onPressOrder}
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
                    {orderPrice ? (
                      <AppText
                        textWeight="500"
                        style={[styles.buttonText, styles.alignRight2]}>
                        ${orderPrice}
                      </AppText>
                    ) : null}
                  </View>
                </AppButton>
              </View>
            </View>
            <RentalModal
              items={pressItem.rent}
              isModalOpen={isRentalModalOpen}
              closePress={this.onPressCloseModal}
              itemPress={this.onPressItemPress}
              selectedItem={selected}
            />
            <SizeModal
              items={pressItem.sizes}
              isModalOpen={isSizeModalOpen}
              closePress={this.onPressCloseModal}
              itemPress={this.onPressSizeItemPress}
              selectedItem={selectedSize}
            />
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...EquipmentActions,
      ...AlertActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  equipment: state.equipment.equipment,
  cartQuantity: state.equipment.cart.quantity,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientMedicalEquipmentRentalItemDetail);
