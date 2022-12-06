import React, {Component} from 'react';
import {View, Text, FlatList, TouchableWithoutFeedback} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  CheckmarkToggle,
  LoaderList,
  ButtonLoading,
  AppText,
} from '@components/common';
import {Globals} from '@constants/GlobalStyles';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import styles from './PatientBookCaregivers.styles';

import BookCaregiversApi from '@api/bookCaregiversApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

class PatientBookCaregivers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedList: [],
      isLoading: true,
      isLoadingButton: false,
      data: null,
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadData();
    ////this.mixpanel.track('View Book Caregivers Home');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressNext = () => {
    const {actions, navigation} = this.props;
    const {checkedList} = this.state;

    if (checkedList.length === 0) {
      actions.setAlert('Please select at least one service.');
      return;
    }

    this.setState({isLoadingButton: true});

    BookCaregiversApi.caregiverType({checkedList})
      .promise.then(result => {
        const services = result.data.services;

        this.setState({isLoadingButton: false});

        navigation.navigate('PatientBookCaregiversInterim', {services});
      })
      .catch(error => {
        this.setState({isLoadingButton: false});
        actions.setAlert(error.data.error);
      });
  };

  onPressCheckmark = item => {
    let {checkedList} = this.state;

    if (checkedList.indexOf(item) == -1) {
      checkedList.push(item);
      this.setState({checkedList});
    } else {
      checkedList = checkedList.filter(i => i != item);
      this.setState({checkedList});
    }
  };

  loadData() {
    const {actions} = this.props;

    this.setState({isLoading: true});

    setTimeout(() => {
      BookCaregiversApi.getServices()
        .promise.then(result => {
          const items = result.data.services;

          this.setState({isLoading: false, data: items}, () => {
            this.forceUpdate();
          });
        })
        .catch(error => {
          this.setState({isLoading: false});
          actions.setAlert(error.data.error);
        });
    }, 300);
  }

  isChecked = item => {
    const {checkedList} = this.state;
    if (checkedList.indexOf(item) == -1) {
      return false;
    }
    return true;
  };

  keyExtractor = item => {
    return `key_${item.name}`;
  };

  renderRowItem = row => {
    const {item} = row;

    const isChecked = this.isChecked(item.serviceId);

    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPressCheckmark(item.serviceId)}>
        <View style={styles.checkmarkContainer}>
          <CheckmarkToggle
            checked={isChecked}
            onPress={() => this.onPressCheckmark(item.serviceId)}
          />
          <AppText textWeight="400" style={styles.textCheckmark}>
            {item.name}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderHeader() {
    return (
      <Text style={styles.textIntro}>
        Please select which services you would like:
      </Text>
    );
  }

  renderFooter() {
    return <View style={styles.bottomFooterSpace}></View>;
  }

  render() {
    const {isLoading, isLoadingButton, data} = this.state;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View
            style={[
              styles.container,
              {paddingBottom: insets.bottom, paddingTop: insets.top},
            ]}>
            <CustomHeaderBack
              title="Book Caregivers"
              onPressBack={this.onPressBack}
            />
            <LoaderList loading={isLoading} />
            {!isLoading ? (
              <>
                <View style={styles.containerFlatList}>
                  <FlatList
                    ref={ref => {
                      this.listRef = ref;
                    }}
                    removeClippedSubviews
                    initialNumToRender={20}
                    onEndReachedThreshold={1200}
                    keyExtractor={this.keyExtractor}
                    extraData={this.state}
                    data={data}
                    renderItem={this.renderRowItem}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                  />
                  <View style={styles.bottomContainer}>
                    <View style={styles.bottomContainerInner}>
                      <ButtonLoading
                        onPress={this.onPressNext}
                        isLoading={isLoadingButton}
                        containerStyle={styles.button}>
                        <AppText
                          textWeight={`${
                            Platform.OS === 'ios' ? '600' : '500'
                          }`}
                          style={styles.buttonText}>
                          NEXT
                        </AppText>
                      </ButtonLoading>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <View />
            )}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions,
      ...AlertActions,
    },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  pubnub: state.pubnub,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientBookCaregivers);
