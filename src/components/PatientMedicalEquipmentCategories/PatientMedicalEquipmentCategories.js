import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image } from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  LoaderList,
  CategoryItem2,
  AppButton
} from '@components/common';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMedicalEquipmentCategories.styles';

import EquipmentApi from '@api/equipmentApi';

import * as EquipmentActions from '@ducks/equipment';

class PatientMedicalEquipmentCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.navigation.getParam('data', null)
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Medical Equipment Categories');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressCategory = item => {
    const { navigation } = this.props;
    const { data } = this.state;

    navigation.navigate('PatientMedicalEquipmentItems', { data, item });
  };

  onPressCart = item => {
    const { navigation } = this.props;

    navigation.navigate('PatientMedicalEquipmentCart');
  };

  onPressLiveChat = () => {
    const { navigation } = this.props;

    // navigation.navigate('');
  };

  renderFooter() {
    const { data } = this.state;

    if (data.id === 2) {
      return (
        <>
          <AppText textWeight="300" style={styles.textUpsell}>Can't find an item you are looking for? Chat with our representative and we'll find it for you.</AppText>
          <View style={styles.buttonUpsellContainer}>
            <AppButton
              onPress={this.onPressLiveChat}
              width={146}
              height={36}
              backgroundColor={Colors.buttonBlue}
              disabled={false}>
              <AppText textWeight="500" style={styles.buttonUpsellText}>Open Live Chat</AppText>
            </AppButton>
          </View>
        </>
      )
    }
    return null;
  }

  renderItem(data, index) {
    const key = data.categoryId;

    return (
      <CategoryItem2 key={key} data={data} handler={() => this.onPressCategory(data)} />
    )
  }

  renderItems() {
    const { equipment } = this.props;

    return (
      <>
        {equipment.length ? (
          <>
            {equipment.map((data, index) => {
              return this.renderItem(data, index);
            })}
          </>
        ) : null}
      </>
    );
  }

  render() {
    const { cartQuantity } = this.props;
    const { data } = this.state;

    const title = data.id === 1 ? 'Rent Equipment' : 'Purchase Equipment';

    return (
      <SafeAreaView style={Globals.safeAreaView}>
        <CustomHeaderBack title={title} onPressBack={this.onPressBack} onPressCart={this.onPressCart} cartItemCount={cartQuantity} />
        <ScrollView>
          {this.renderItems()}
          {/*this.renderFooter()*/}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const selectorName = (state, ownProps) => {
    const data = ownProps.navigation.getParam('data', null);

    if (data.id === 1) return state.equipment.equipmentRent
    else if (data.id === 2) return state.equipment.equipmentPurchase
    else return null
  }

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...EquipmentActions
    },
    dispatch
  )
});

const mapStateToProps = (state, ownProps) => {
  return { 
    equipment: selectorName(state, ownProps),
    cartQuantity: state.equipment.cart.quantity
  }  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientMedicalEquipmentCategories);
