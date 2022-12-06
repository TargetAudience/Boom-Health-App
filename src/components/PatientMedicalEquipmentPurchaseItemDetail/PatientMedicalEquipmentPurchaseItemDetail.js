import React, {Component} from 'react';
import {View, ScrollView, Image, Dimensions} from 'react-native';
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
  SizeModal,
  AppText,
} from '@components/common';
import {Colors, Globals} from '@constants/GlobalStyles';
import {currencyFormat} from '@utils/Globals';
import images from '@assets/images';
import styles from './PatientMedicalEquipmentPurchaseItemDetail.styles';
import {assetsUrl} from '@lib/Settings';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import * as EquipmentActions from '@ducks/equipment';
import * as AlertActions from '@ducks/alert';

const {width} = Dimensions.get('screen');

class PatientMedicalEquipmentPurchaseItemDetail extends Component {
  constructor(props) {
    super(props);

    const pressItem = props.navigation.getParam('pressItem', null);
    const item = props.navigation.getParam('item', null);
    const data = props.navigation.getParam('data', null);

    this.state = {
      pressItem,
      item,
      data,
      selectedSizeItem: null,
      isSizeModalOpen: false,
      selectedRentalItem: null,
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //('View Medical Equipment Purchase Item Detail');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressOrder = () => {
    const {navigation, actions} = this.props;
    const {item, data, pressItem, selectedRentalItem, selectedSizeItem} =
      this.state;

    const label = pressItem.sizeLabel
      ? pressItem.sizeLabel.toLowerCase()
      : 'size';

    if (pressItem.hasSizes == 1 && !selectedSizeItem) {
      actions.setAlert(`Please select your ${label} option.`);
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

  onPressCart = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientMedicalEquipmentCart');
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

  renderButtons() {
    const {pressItem, selectedSizeItem} = this.state;

    const size = selectedSizeItem ? selectedSizeItem.size : '-';
    const label = pressItem.sizeLabel ? pressItem.sizeLabel : 'SIZE';
    const showSizeButton = pressItem.hasSizes == 1 ? true : false;

    const sizeButton = (
      <View style={styles.midButtonsContainer}>
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
              SELECT {label}
            </AppText>
            <AppText
              textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
              style={[styles.buttonText, styles.alignRight]}>
              {size}
            </AppText>
          </View>
        </AppButton>
      </View>
    );

    return showSizeButton ? sizeButton : null;
  }

  render() {
    const {cartQuantity} = this.props;
    const {pressItem, isSizeModalOpen, selectedRentalItem, selectedSizeItem} =
      this.state;

    const thumb = `${assetsUrl}images/equipment/${pressItem.featureImage}`;
    const noImage = !pressItem.featureImage
      ? styles.imageThumbContainerNoImage
      : null;

    const selectedSize = selectedSizeItem ? selectedSizeItem.sizeId : null;

    const descriptionGapStyle = !pressItem.hasSizes
      ? styles.descriptionGap
      : null;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View
            style={[
              styles.container,
              {paddingTop: insets.top, paddingBottom: insets.bottom},
            ]}>
            <CustomHeaderBack
              title={pressItem.name}
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

              <View style={descriptionGapStyle} />
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
                    <AppText
                      textWeight="500"
                      style={[styles.buttonText, styles.alignRight2]}>
                      {currencyFormat(pressItem.price)}
                    </AppText>
                  </View>
                </AppButton>
              </View>
            </View>
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
)(PatientMedicalEquipmentPurchaseItemDetail);
