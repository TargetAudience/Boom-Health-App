import React, { Component } from 'react';
import { View } from 'react-native';
import { CustomHeaderBack } from '@components/common';
import SafeAreaView from 'react-native-safe-area-view';
import Pdf from 'react-native-pdf';
//import MixpanelManager from '@utils/Analytics';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AppText, LoaderList, ScreenWrapper } from '@components/common';
import { Globals } from '@constants/GlobalStyles';
import styles from './PdfPage.styles';

import { documentsUrl } from '@lib/Settings';

import DocumentsApi from '@api/documentsApi';

import * as AlertActions from '@ducks/alert';

class PdfPage extends Component {
  constructor(props) {
    super(props);

    const item = _.get(props.navigation, 'state.params.item', null);

    this.state = {
      item,
      source: null,
      actionLoading: true
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this.loadApiData();

    //this.mixpanel.track('View Order History PDF');
  }

  loadApiData = () => {
    const { actions } = this.props;
    const { item } = this.state;

    this.setState({ actionLoading: true });

    DocumentsApi.getPdf({ item })
      .promise.then(result => {
        const fileName = result.data.fileUrl;

        const source = {
          fileName,
          uri: fileName,
          cache: false
        };

        this.setState({ source, actionLoading: false });
      })
      .catch(error => {
        console.log('Order History error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.error);
      });
  };

  onPressClose = () => {
    const { navigation } = this.props;

    navigation.pop();
  };

  renderDocument = () => {
    const { source, actionLoading } = this.state;

    if (!actionLoading) {
      if (source && source.fileName) {
        return <Pdf source={source} style={styles.pdf} />;
      } else {
        return (
          <View style={styles.containerNoDisplay}>
            <AppText textWeight={'400'} style={styles.textNoDisplay}>
              This file type isn't supported by the app.{'\n'}Please try sending
              it to your email.
            </AppText>
          </View>
        );
      }
    }
  };

  render() {
    const { item, actionLoading } = this.state;

    return (
      <ScreenWrapper>
        <CustomHeaderBack title={item.title} onPressClose={this.onPressClose} />
        <LoaderList loading={actionLoading} />
        <View style={styles.container}>{this.renderDocument()}</View>
      </ScreenWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions
    },
    dispatch
  )
});

export default connect(null, mapDispatchToProps)(PdfPage);
