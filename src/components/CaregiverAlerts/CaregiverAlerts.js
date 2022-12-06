import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class CaregiverAlerts extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Caregiver Alerts</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({});

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaregiverAlerts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});