import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { PersonTopSection, CustomHeaderBack, HelpModal, AppButton, CreditCardIcon } from '@components/common';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import { Colors } from '@constants/GlobalStyles';
import { formatPhoneNumber, formatPostalCode } from '@utils/Globals';
import styles from './PatientBookHomePersonalCarePurchaseSuccess.styles';
import images from '@assets/images';

const { width } = Dimensions.get('screen');

class PatientBookHomePersonalCarePurchaseSuccess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerOrderId: props.navigation.getParam('customerOrderId', null),
      selectedCard: props.navigation.getParam('selectedCard', null),
      addressDisplayArr: props.navigation.getParam('addressDisplayArr', null)
    }
  }

  onPressContinue = () => {
    const { navigation } = this.props;

    const resetAction = StackActions.reset({
      index: 0,
      key: undefined,
      actions: [NavigationActions.navigate({ routeName: 'PatientHome' })]
    });

    navigation.dispatch(resetAction);
  };

  render() {
    const { auth, cardData } = this.props;
    const { customerOrderId, addressDisplayArr, selectedCard } = this.state;

    const card = cardData.find(item => item.cardUuid === selectedCard);

    let now = moment().format('MMMM D, YYYY, h:mm A').toString().toUpperCase();

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="Purchase Success" />
        <ScrollView style={styles.container}>
          <View style={styles.blankStateContainer}>
            <Image
              style={styles.imageOrdered}
              source={images.boomOrdered}
            />
            <View style={styles.textIconContainer}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.addressIcon}
                  source={images.address}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textIconText}>{addressDisplayArr.name}</Text>
                <Text style={styles.textIconText}>{addressDisplayArr.street}</Text>
                <Text style={styles.textIconText}>{addressDisplayArr.city}, {addressDisplayArr.province}</Text>
                <Text style={styles.textIconText}>{formatPostalCode(addressDisplayArr.postalCode)}</Text>
                <Text style={[styles.textIconText, styles.textIconTextGapTop]}>{formatPhoneNumber(addressDisplayArr.phoneNumber)}</Text>
              </View>
            </View>

            <View style={styles.rowContainerGroup}>
              <View style={styles.rowContainer2}>
                <Text style={styles.leftLabelText}>STATUS</Text>
                <Text style={styles.rightLabelText}>OPEN</Text>
              </View>
              <View style={styles.rowContainer2}>
                <Text style={styles.leftLabelText}>ORDER NUMBER</Text>
                <Text style={styles.rightLabelText}>{customerOrderId}</Text>
              </View>
              <View style={styles.rowContainer2}>
                <Text style={styles.leftLabelText}>ORDER TIME</Text>
                <Text style={styles.rightLabelText}>{now}</Text>
              </View>
              <View style={styles.rowContainer2}>
                <Text style={styles.leftLabelText}>PAYMENT</Text>
                <CreditCardIcon icon={card.cardType} />
              </View>
            </View>

            <Text style={styles.blankStateText}>{`We've just sent you a confirmation via email.`}</Text>
            <AppButton
              style={styles.buttonContinue}
              onPress={this.onPressContinue}
              width={148}
              height={40}
              backgroundColor={Colors.buttonMain}>
              <Text style={styles.buttonText}>Return Home</Text>
            </AppButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  cardData: state.profile.cardData
});

export default connect(
  mapStateToProps,
  null
)(PatientBookHomePersonalCarePurchaseSuccess);

