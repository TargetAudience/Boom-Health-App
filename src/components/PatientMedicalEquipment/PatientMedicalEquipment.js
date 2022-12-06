import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image } from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  CategoryItem2,
  LoaderList,
  AppText
} from '@components/common';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMedicalEquipment.styles';

import * as EquipmentActions from '@ducks/equipment';

import EquipmentApi from '@api/equipmentApi';

const items = [
  {
    id: 1,
    name: 'Rent Equipment',
    description: null
  },
  {
    id: 2,
    name: 'Purchase Equipment',
    description: null
  },
];

class PatientMedicalEquipment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();
    ////this.mixpanel.track('View Medical Equipment Home');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressCategory = item => {
    const { navigation } = this.props;

    navigation.navigate('PatientMedicalEquipmentCategories', { data: item });
  };

  onPressCart = item => {
    const { navigation } = this.props;

    navigation.navigate('PatientMedicalEquipmentCart');
  };

  loadData() {
    const { actions } = this.props;

    this.setState({ actionLoading: true });

    EquipmentApi.getMedicalEquipment()
      .promise.then(result => {
        const equipment = result.data;

        actions.addEquipment(equipment);

        this.setState({ actionLoading: false });
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  renderItem(data, index) {
    const key = data.id;

    return (
      <CategoryItem2 key={key} data={data} handler={() => this.onPressCategory(data)} />
    )
  }

  render() {
    const { cartQuantity } = this.props;
    const { actionLoading } = this.state;

    return (
      <SafeAreaView style={Globals.safeAreaView}>
        <CustomHeaderBack title="Medical Equipment" onPressBack={this.onPressBack} onPressCart={this.onPressCart} cartItemCount={cartQuantity} />
        <LoaderList loading={actionLoading} />
        {!actionLoading ? (
          <ScrollView>
            {items.map((data, index) => {
              return this.renderItem(data, index);
            })}
          </ScrollView>
        ) : null}
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
)(PatientMedicalEquipment);
