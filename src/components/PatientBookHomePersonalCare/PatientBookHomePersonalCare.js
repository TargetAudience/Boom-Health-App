import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  CategoryItem,
  LoaderList,
  GenericModal
} from '@components/common';
import { Globals } from '@constants/GlobalStyles';
import styles from './PatientBookHomePersonalCare.styles';

import HomePersonalCareApi from '@api/homePersonalCareApi';

import * as HomePersonalCareActions from '@ducks/homePersonalCare';

class PatientBookHomePersonalCare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false,
      isModalOpen: true
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();
    //this.mixpanel.track('View Personal Care Home');
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressCart = item => {
    const { navigation } = this.props;

    this.setState({ isModalOpen: true });

    //navigation.navigate('PatientBookHomePersonalCareCart');
  };

  onPressCategory = item => {
    const { navigation } = this.props;

    this.setState({ isModalOpen: true });

    //navigation.navigate('PatientBookHomePersonalCarePricing', { data: item });
  };

  onPressCancel = () => {
    this.setState({ isModalOpen: false });
  };

  loadData() {
    const { actions } = this.props;

    this.setState({ actionLoading: true });

    HomePersonalCareApi.getCatalog()
      .promise.then(result => {
        const catalog = result.data.homeCareCatalog;

        actions.addHomeCare(catalog);

        this.setState({ actionLoading: false });
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  renderItem(data, index) {
    const key = data.serviceCategoryId;

    return (
      <CategoryItem key={key} data={data} handler={() => this.onPressCategory(data)} />
    )
  }

  render() {
    const { catalog, cartQuantity } = this.props;
    const { isModalOpen, actionLoading } = this.state;

    return (
      <SafeAreaView style={Globals.safeAreaView}>
        <CustomHeaderBack title="Personal Care Services" onPressBack={this.onPressBack} onPressCart={this.onPressCart} cartItemCount={cartQuantity} />
        <LoaderList loading={actionLoading} />
        {!actionLoading ? (
          <ScrollView style={Globals.background}>
            <View style={styles.invitesWrap}>
              {catalog.map((data, index) => {
                return this.renderItem(data, index);
              })}
            </View>
          </ScrollView>
        ) : null}
        <GenericModal
          onPressOne={this.onPressCancel}
          buttonOneLabel={'OK'}
          isModalOpen={isModalOpen}
          onPressCloseButton={this.onPressCancel}
          titleText="Personal Care Services"
          buttonOneWidth={120}
          modalHeight={220}
          scrollHeight={135}
          helpText={'Services are not currently available due to Ontario government COVID-19 restrictions.'}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...HomePersonalCareActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  catalog: state.homePersonalCare.catalog,
  cartQuantity: state.homePersonalCare.cart.quantity
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientBookHomePersonalCare);
