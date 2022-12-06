import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { CustomHeaderBack, LoadingModal, ScreenWrapper } from '@components/common';

class LaunchWebView extends Component {
  renderLoadingView() {
    return <LoadingModal visible />;
  }

  onPressClose = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  }

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { link, title, backArrow } = params;

    return (
      <ScreenWrapper bottomBackground>
        {backArrow ? (
          <CustomHeaderBack title={title} onPressBack={this.onPressClose} />
        ) : (
          <CustomHeaderBack title={title} onPressClose={this.onPressClose} />
        )}

        <WebView
          renderLoading={this.renderLoadingView}
          startInLoadingState
          automaticallyAdjustContentInsets={false}
          allowsBackForwardNavigationGestures
          source={{ uri: link }}
          javaScriptEnabled
          domStorageEnabled
        />
      </ScreenWrapper>
    );
  }
}

export default LaunchWebView;
