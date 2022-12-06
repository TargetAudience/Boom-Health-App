import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  CustomHeaderBack,
  LoaderList,
  FormWrapper,
  InputWithLabel,
  ButtonLoading,
  AppText
} from '@components/common';
import { FormStyles } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './CaregiverMyServices.styles';

import CaregiverMySerivcesApi from '@api/caregiverMySerivcesApi';

import * as EquipmentActions from '@ducks/equipment';
import * as AlertActions from '@ducks/alert';

class CaregiverMyServices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      categories: [],
      serviceTypeSub: null,
      serviceType: null,
      description: '',
      actionLoading: false,
      dataLoading: false,
      showForm: false
    };

    this.onPressAddService = this.onPressAddService.bind(this);
    this.nextKeyboardPatientsPostalCode = this.nextKeyboardPatientsPostalCode.bind(this);
    this.nextKeyboardPrice = this.nextKeyboardPrice.bind(this);

    this.patientsProvinceRef = React.createRef();
    this.patientsPostalCodeRef = React.createRef();
    this.priceRef = React.createRef();
  }

  componentDidMount() {
    this.loadData();
  }

  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressRemoveItem = item => {
    const { items } = this.state;

    this.setState({ actionLoading: true });

    CaregiverMySerivcesApi.removeService({ id: item.serviceId })
      .promise.then(() => {
        const itemsNew = items.filter(val => val.serviceId !== item.serviceId);

        this.setState(
          { actionLoading: false, items: itemsNew, showForm: !itemsNew.length },
          () => {
            this.forceUpdate();
          }
        );
      })
      .catch(error => {
        console.debug('error', error);
        this.setState({ actionLoading: false });
      });
  };

  onPressToggleAddService = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  };

  async onPressAddService() {
    const { actions } = this.props;
    const {
      serviceType,
      serviceTypeSub,
      description,
      items
    } = this.state;

    if (serviceType === null) {
      actions.setAlert('Please enter a service type.');
      return;
    }
    if (serviceTypeSub === null) {
      actions.setAlert('Please enter a service name.');
      return;
    }

    if (Number(serviceTypeSub) === serviceTypeSub) {
      const findCategory = items.find(
        item => item.serviceSubCategoryId === serviceTypeSub
      );
      if (findCategory !== undefined) {
        actions.setAlert(
          'You are already offering this item in your services.'
        );
        return;
      }
    }

    this.setState({ actionLoading: true });

    await CaregiverMySerivcesApi.addService({
      serviceType,
      serviceTypeSub,
      description
    })
      .promise.then(async result => {
        const data = result.data.items;
        this.setState({
          actionLoading: false,
          items: data,
          serviceTypeSub: null,
          serviceType: null,
          description: '',
          showForm: false,
        });

        actions.setAlert('Service has been added.');
      })
      .catch(error => {
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  }

  loadData() {
    const { actions } = this.props;

    this.setState({ dataLoading: true });

    CaregiverMySerivcesApi.getServices()
      .promise.then(result => {
        const items = result.data.items;
        const categories = result.data.categories;

        this.setState({
          dataLoading: false,
          categories,
          items,
          showForm: !items.length,
        });
      })
      .catch(error => {
        this.setState({ dataLoading: false });
        actions.setAlert(error.data.error);
      });
  }

  getCategoriesSub = () => {
    const { serviceType, categories } = this.state;

    let returnVals = [];
    if (Number(serviceType) === serviceType) {
      const findCategory = categories.find(item => item.value === serviceType);
      returnVals = findCategory.subCategories;
    }
    return returnVals;
  };

  getPrice = () => {
    const { serviceType, serviceTypeSub, categories } = this.state;

    if (Number(serviceTypeSub) === serviceTypeSub) {
      const findCategory = categories.find(item => item.value === serviceType);
      const category = findCategory.subCategories;

      const findPrice = category.find(item => item.value === serviceTypeSub);
      return findPrice.price;
    }
    return null;
  };

  nextKeyboardPatientsPostalCode() {
    this.patientsProvinceRef.togglePicker(true);
  }

  nextKeyboardPrice() {
    this.patientsPostalCodeRef.togglePicker(true);
  }

  renderItems() {
    const { items } = this.state;

    const itemsList = [];
    items.forEach(item => {
      itemsList.push(this.renderItem(item));
    });

    return (
      <>
        <Text style={styles.textTitle}>My Services</Text>
        <View style={styles.invitesWrap}>{itemsList}</View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.onPressToggleAddService}>
          <View style={styles.addCardContainer}>
            <Image style={styles.plusIcon} source={images.plus} />
            <Text style={styles.addCardText}>Add Service</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }

  renderItem(item) {
    return (
      <View key={item.serviceId} style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.leftContainerInner}>
            <Text style={styles.subCategoryText}>{item.subCategory}</Text>
            <Text style={styles.priceText}>
              <Text>${item.price}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={index => this.onPressRemoveItem(item)}>
            <View style={styles.removeContainer}>
              <Text style={styles.textRemove}>REMOVE</Text>
              <Image
                style={[styles.icon, { width: 16, height: 16 }]}
                source={images.delete}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {
      serviceType,
      showForm,
      items,
      serviceTypeSub,
      categories,
      actionLoading,
      dataLoading,
    } = this.state;

    const showServiceType = serviceType !== '' ? true : false;
    const showItems = items.length ? true : false;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="My Services" onPressBack={this.onPressBack} />
        <LoaderList loading={dataLoading} />

        <KeyboardAwareScrollView>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={false}>
            {showItems ? this.renderItems() : null}
            {showForm ? (
              <FormWrapper style={styles.topGap}>
                <InputWithLabel
                  onRef={ref => { this.patientsProvinceRef = ref }}
                  select
                  items={categories}
                  selectValue={serviceType}
                  containerStyle={[
                    FormStyles.inputSelect,
                    FormStyles.inputContainerLabel
                  ]}
                  style={FormStyles.inputStyle}
                  autoCorrect={false}
                  autoFocus={false}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  maxLength={2}
                  numberOfLines={1}
                  returnKeyType="next"
                  label="Service Type"
                  onValueChange={text =>
                    this.setState({ serviceType: text, serviceTypeSub: null })
                  }
                  onDonePress={this.nextKeyboardPatientsPostalCode}
                />
                {showServiceType ? (
                  <InputWithLabel
                    onRef={ref => { this.patientsPostalCodeRef = ref }}
                    select
                    selectValue={serviceTypeSub}
                    items={this.getCategoriesSub()}
                    containerStyle={[
                      FormStyles.inputSelect,
                      FormStyles.inputContainerLabel
                    ]}
                    style={FormStyles.inputStyle}
                    autoCorrect={false}
                    autoFocus={false}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    maxLength={2}
                    numberOfLines={1}
                    returnKeyType="next"
                    label="Service Name"
                    onValueChange={text =>
                      this.setState({ serviceTypeSub: text })
                    }
                    onDonePress={this.nextKeyboardPrice}
                  />
                ) : null}
                <InputWithLabel
                  refInput={ref => {
                    this.priceRef = ref;
                  }}
                  containerStyle={[
                    FormStyles.inputContainer,
                    FormStyles.inputContainerLabel,
                    FormStyles.inputContainerDisabled
                  ]}
                  style={FormStyles.inputStyle}
                  autoCorrect={false}
                  autoFocus={false}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  maxLength={6}
                  numberOfLines={1}
                  keyboardType="numeric"
                  returnKeyType="next"
                  label="Price"
                  disabled
                  value={this.getPrice()}
                />
                <View style={styles.buttonContainer}>
                  <ButtonLoading
                    onPress={this.onPressAddService}
                    isLoading={actionLoading}
                    containerStyle={FormStyles.button}>
                    <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonText}>ADD SERVICE</AppText>
                  </ButtonLoading>
                </View>
              </FormWrapper>
            ) : null}
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...EquipmentActions,
      ...AlertActions
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
)(CaregiverMyServices);

/*
<InputWithLabel
  onRef={this.passwordInputRef}
  containerStyle={[
    FormStyles.inputContainer,
    FormStyles.inputContainerMultiLine,
    FormStyles.inputContainerLabel
  ]}
  maxLength={1000}
  textAlignVertical="top"
  multiline
  style={FormStyles.inputStyleMultiLine}
  autoCorrect={true}
  autoFocus={false}
  autoCapitalize="none"
  underlineColorAndroid="transparent"
  returnKeyType="next"
  label="Additional Service Description (Optional)"
  value={description}
  onChangeText={text => this.setState({ description: text })}
  onSubmitEditing={this.nextKeyboardConfirmPassword}
/>
*/
