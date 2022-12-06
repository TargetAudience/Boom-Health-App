import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { AppText, AppButton, RentalModalB } from '@components/common';
import { currencyFormat, pluralize } from '@utils/Globals';
import images from '@assets/images';
import styles from './CartItem.styles';
import { Colors } from '@constants/GlobalStyles';

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRentalModalOpen: false,
      selectedRentalItem: {
        optionId: null,
        rentOptions: [],
        duration: null,
        price: null
      },
      selectedRentalOption: null
    };
  }

  onPressCloseRentalModal = () => {
    this.setState({ isRentalModalOpen: false });
  };

  onPressRentalModalOpen = item => {
    this.setState({ isRentalModalOpen: true, selectedRentalItem: item });
  };

  onPressItemPress = item => {
    const { onPressItemDurationChange } = this.props;

    this.setState({ isRentalModalOpen: false, selectedRentalOption: item });
    onPressItemDurationChange(item);
  };

  renderPrice = price => {
    if (price != 0) {
      return currencyFormat(price);
    }
    return null;
  };

  renderButton = () => {
    const { data } = this.props;
    const { selectedRentalOption } = this.state;

    let buttonLabel;
    if (selectedRentalOption?.duration) {
      buttonLabel = selectedRentalOption.duration;
    } else if (data?.duration) {
      buttonLabel = data.duration;
    } else {
      buttonLabel = 'SELECT LENGTH OF RENTAL';
    }

    return (
      <AppButton
        style={[styles.button, styles.buttonSizingB]}
        onPress={() => this.onPressRentalModalOpen(data)}
        width={210}
        height={30}
        backgroundColor={Colors.buttonMain}
        disabled={false}>
        <View style={styles.buttonTextContainer3}>
          <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.buttonBuyText2}>
            {buttonLabel}
          </AppText>
        </View>
      </AppButton>
    );
  };

  renderRentalModal = () => {
    const { isRentalModalOpen, selectedRentalItem } = this.state;

    return (
      <RentalModalB
        isModalOpen={isRentalModalOpen}
        closePress={this.onPressCloseRentalModal}
        itemPress={this.onPressItemPress}
        selectedItem={selectedRentalItem}
      />
    );
  }

  render() {
    const { data, onPressDecrement, onPressIncrement, onPressRemoveItem } = this.props;

    const incrementImage = data.quantity < 99 ? images.increment : images.incrementDisabled;
    const decrementImage = data.quantity > 1 ? images.decrement : images.decrementDisabled;

    const counterContainerWidth = data.cartType === 'equipment' ? 80 : 110;
    const cartTypeLabel = data.cartTypeLabel ? data.cartTypeLabel : '';
    const cardTypeWord = pluralize(data.quantity, cartTypeLabel, false);
    const quantity = data.cartType === 'meals' ? data.quantity + ' ' + cardTypeWord : data.quantity;

    return (
      <View style={styles.container}>
        {this.renderRentalModal(data)}
        <View style={styles.detail}>
          <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.name}>
            {data.name}
          </AppText>
          {data.nickname ? (
            <AppText textWeight="300" style={styles.description}>
              {data.nickname}
            </AppText>
          ) : null}
          {data.type === 'buy' ? (
            <View style={[styles.counterContainer, { width: counterContainerWidth }]}>
              <TouchableOpacity activeOpacity={0.8} onPress={onPressDecrement}>
                <Image source={decrementImage} style={styles.increment} />
              </TouchableOpacity>
              <AppText textWeight="500" style={styles.textQuantity}>
                {quantity}
              </AppText>
              <TouchableOpacity activeOpacity={0.8} onPress={onPressIncrement}>
                <Image source={incrementImage} style={styles.increment} />
              </TouchableOpacity>
            </View>
          ) : null}
          {data.type === 'rent' && data.cartItemType === 'renew'  ? (
            this.renderButton()
          ) : null}
        </View>
        <View style={styles.priceContainer}>
          <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.textPrice}>
            {this.renderPrice(data.priceTally)}
          </AppText>
        </View>
        <View style={styles.removeContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={onPressRemoveItem}>
            <Image source={images.cancel} style={styles.cancel} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CartItem;
