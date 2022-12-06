import React, {Component} from 'react';
import {AppState, Platform} from 'react-native';
import NavigationService from '@utils/NavigationService';
import {appVersion} from '@lib/Settings';
//import MixpanelManager from '@utils/Analytics';

import UserApi from '@api/userApi';

class LoadRoot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: '',
    };

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
  }

  componentWillUnmount() {
    if (!this.appStateSubscription) {
      return;
    }
    this.appStateSubscription.remove();
    // this.mixpanel.flush();
  }

  handleAppStateChange = async nextAppState => {
    const {appState} = this.state;

    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.loadData();
    }
    this.setState({appState: nextAppState});
  };

  loadData() {
    UserApi.getVersion({temp: 1})
      .promise.then(result => {
        const version = result.data.version;

        this.reviewVersion(version);
      })
      .catch(error => {
        console.log('LoadRoot error', error);
      });
  }

  reviewVersion(version) {
    const minVersion = Number(version.minVersion);
    const maxVersion = Number(version.maxVersion);

    if (appVersion < maxVersion && appVersion > minVersion) {
      // Dismissable popup giving them the option to update.
    }
    if (appVersion < minVersion) {
      NavigationService.navigateReset('ForceAppUpdate');
    }
  }

  render() {
    return null;
  }
}

export default LoadRoot;
