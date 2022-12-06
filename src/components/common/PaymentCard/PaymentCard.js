import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View, ActivityIndicator, TouchableHighlight } from 'react-native';
import { FormWrapper, CreditCardIcon, InputWithLabel, ButtonLoading, CustomHeaderBack, AppButton, CheckmarkToggle, AppText } from '@components/common';
import { Colors, FormStyles } from '@constants/GlobalStyles';
import { isNumeric } from '@utils/Globals';
import images from '@assets/images';
import styles from './PaymentCard.styles';

import ProfileApi from '@api/profileApi';

class PaymentCard extends Component {
  constructor(props) {
    super(props);
  }

  onCardPress = (cardUuid) => {
    const { selectedCard } = this.props;

    if (cardUuid !== selectedCard) {
      this.props.selectedCardCallback(cardUuid);
    }
  }

  onPressAddCard = item => {
    const { navigation } = this.props;

    navigation.navigate('AddCard', { onRefresh: this.onRefresh });
  };

  onRefresh = () => {
    this.props.selectedCardCallback('default');

    this.forceUpdate();
  };

  renderNoCardsFound() {
    return <AppText textWeight="300">No payment cards have been added.</AppText>;
  }

  renderAddCardButton() {
    return (
      <View style={styles.addCardButtonContainer}>
        <AppButton
          onPress={this.onPressAddCard}
          width={100}
          height={30}
          backgroundColor={Colors.buttonMain}>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonTextAdd}>Add Card</AppText>
        </AppButton>
      </View>
    );
  }

  renderCards() {
    const { cardData } = this.props;

    const cardList = [];

    {cardData.forEach(card => {
      cardList.push(this.renderCard(card))
    })};

    return cardList;
  }

  renderCard(item) {
    const { selectedCard } = this.props;

    let cardLabel = '';

    switch (item.cardType) {
      case 'american-express':
        cardLabel = 'Amex';
        break;
      case 'discover':
        cardLabel = 'Discover';
        break;
      case 'mastercard':
        cardLabel = 'Mastercard';
        break;
      case 'visa':
        cardLabel = 'Visa';
        break;
      default:
        cardLabel = '';
    }

    return (
      <TouchableHighlight
        onPress={() => this.onCardPress(item.cardUuid)}
        activeOpacity={1}
        key={item.cardUuid} 
        style={styles.invitesContainer}
        underlayColor={Colors.white}>
        <View style={styles.invitesInner}>
          <View style={styles.cardTypeContainer}>
            <View style={styles.cardTypeWrap}>
              <CreditCardIcon icon={item.cardType} />
              <AppText textWeight="500" style={styles.textCardText}>{cardLabel} ending in {item.last4}</AppText>
            </View>
            <AppText textWeight="500" style={styles.textCardText}>Expires: {item.expiryMonth}/{item.expiryYear}</AppText>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { cardData, alertAmount, selectedFamilyMembers, message } = this.props;

    let alertMessage = '';

    if (message) {
      alertMessage = message;
    } else {
      if (alertAmount) {
        if (selectedFamilyMembers.length === 0) {
          alertMessage = `${alertAmount} will be charged to your card.`;
        } else {
          alertMessage = `${alertAmount} will be charged to each card.`;
        }
      }
    }

    return (
      <View style={[styles.summaryContainer, styles.gap]}>
        <View style={styles.summaryBottomLine}>
          <AppText textWeight="500" style={styles.textCostSummary}>Payment Card</AppText>
        </View>
        {alertMessage != '' ? (
          <View style={styles.alertContainer}>
            <Image source={images.alert} style={styles.alertIcon} />
            <AppText textWeight="500" style={styles.textAlert}>{alertMessage}</AppText>
          </View>
        ) : null}
        
        {cardData.length ? (
          this.renderCards()
        ) : (
          <>
            {this.renderNoCardsFound()}
            {this.renderAddCardButton()}
          </>
        )}
      </View>
    );
  }
}

export default PaymentCard;
