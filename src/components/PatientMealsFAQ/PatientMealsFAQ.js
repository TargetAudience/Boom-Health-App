import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image } from 'react-native';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import { CustomHeaderBack } from '@components/common';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './PatientMealsFAQ.styles';

import * as AuthActions from '@ducks/auth';

class PatientMealsFAQ extends Component {
  onPressBack = () => {
    const { navigation } = this.props;

    navigation.goBack('');
  };

  onPressPresetMeals = () => {
    const { navigation } = this.props;

    navigation.navigate('');
  };

  onPressBuildYourOwn = () => {
    const { navigation } = this.props;

    navigation.navigate('');
  };

  onPressFAQs = () => {
    const { navigation } = this.props;

    navigation.navigate('');
  };

  render() {
    return (
      <SafeAreaView>
        <CustomHeaderBack title="Meal Plans" onPressBack={this.onPressBack} />
        <ScrollView style={Globals.background}>
          <TouchableHighlight
            onPress={this.onPressPresetMeals}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
              <Text style={styles.leftLabelText}>Pre-set Meals</Text>
              <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.onPressBuildYourOwn}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
              <Text style={styles.leftLabelText}>Build Your Own</Text>
              <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.onPressFAQs}
            activeOpacity={0.6}
            underlayColor={Colors.white}>
            <View style={styles.rowContainer}>
              <Text style={styles.leftLabelText}>FAQs</Text>
              <Image style={Globals.iconChevron} source={images.iconChevron} />
            </View>
          </TouchableHighlight>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AuthActions
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  pubnub: state.pubnub
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientMealsFAQ);
