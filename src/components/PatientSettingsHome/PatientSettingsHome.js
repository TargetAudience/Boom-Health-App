import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PubSubContext } from 'src/pubsub';

import * as authActions from '@ducks/auth';
import * as pubNubActions from '@ducks/pubnub';

class PatientSettingsHome extends Component {
  onSignOutPress = () => {
    const { pubsub } = this.context;
    const { navigation, actions } = this.props;
    
    actions.signOut();
    actions.clearHereNow();
    
    pubsub.closeConnections();

    navigation.navigate('PreAuthFlow');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Patient Settings</Text>
        <Button title="Sign Out" onPress={this.onSignOutPress} />
      </View>
    );
  }
  static contextType = PubSubContext;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...pubNubActions }, dispatch)
  };
}

const mapStateToProps = state => ({
});

export default connect(
  null,
  mapDispatchToProps
)(PatientSettingsHome);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
