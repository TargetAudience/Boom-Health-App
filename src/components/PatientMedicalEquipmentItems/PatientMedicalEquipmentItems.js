import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image, FlatList } from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  LoaderList,
  EquipmentItem
} from '@components/common';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMedicalEquipmentItems.styles';

import EquipmentApi from '@api/equipmentApi';

import * as EquipmentActions from '@ducks/equipment';

class PatientMedicalEquipmentItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.navigation.getParam('data', null),
      item: props.navigation.getParam('item', null)
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const { data, item } = this.state;

    const page = data.id === 1 ? 'Rent Items' : 'Purchase Items';
    
    ////this.mixpanel.track('View Medical Equipment ' + page);
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressItem = pressItem => {
    const { navigation } = this.props;
    const { data, item } = this.state;

    const page = data.id === 1 ? 'PatientMedicalEquipmentRentalItemDetail' : 'PatientMedicalEquipmentPurchaseItemDetail';

    navigation.navigate(page, { data, item, pressItem });
  };

  onPressCart = item => {
    const { navigation } = this.props;

    navigation.navigate('PatientMedicalEquipmentCart');
  };

  keyExtractor = () => `key_${Date.now()}${Math.random()}`;

  renderRowItem = data => {
    const key = data.categoryId;

    return (
      <EquipmentItem key={key} data={data.item} handler={() => this.onPressItem(data.item)} />
    )
  };

  renderBlankState() {
    return (
      <View style={styles.blankStateContainer}>
        <Text style={styles.blankStateText}>No equipment has been added for this category yet.</Text>
      </View>
    );
  }

  render() {
    const { cartQuantity } = this.props;
    const { item } = this.state;

    return (
      <SafeAreaView style={Globals.safeAreaView}>
        <CustomHeaderBack title={item.name} onPressBack={this.onPressBack} onPressCart={this.onPressCart} cartItemCount={cartQuantity} />
        <FlatList
          ref={ref => {
            this.listRef = ref;
          }}
          data={item.items}
          initialNumToRender={3}
          maxToRenderPerBatch={30}
          windowSize={101}
          onEndReachedThreshold={1200}
          disableVirtualization={false}
          bounces
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          scrollEventThrottle={1}
          removeClippedSubviews
          automaticallyAdjustContentInsets={false}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderRowItem}
          ListEmptyComponent={this.renderBlankState}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...EquipmentActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  equipment: state.equipment.equipment,
  cartQuantity: state.equipment.cart.quantity
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientMedicalEquipmentItems);
