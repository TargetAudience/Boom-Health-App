import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import { CustomHeaderBack, AppText, LoaderList, AppButton } from '@components/common';
import { Colors, Globals } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './MedicationRemindersViewMedicines.styles';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('window');

const data = [
  {
    itemId: 1,
    name: 'Lipitor'
  },
  {
    itemId: 2,
    name: 'Amoxicillin',
  },
  {
    itemId: 3,
    name: 'Nexium'
  }
];

class MedicationRemindersViewMedicines extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    ////this.mixpanel.track('View Medication Reminders View Medicines');
  }

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  onPressItem = key => {
    const { navigation } = this.props;

    navigation.navigate('MedicationRemindersAddEditMedicine');
  };

  onPressAddItem = () => {
    const { navigation } = this.props;

    navigation.navigate('MedicationRemindersAddEditMedicine');
  };

  keyExtractor = item => {
    return `key_${item.name}`;
  };

  listEmptyComponent() {
    return (
      <View style={styles.blankStateContainer}>
        <Image
          style={styles.blankStateMessages}
          source={images.blankStateMessages}
        />
        <Text style={styles.blankStateText}>You have no medications.</Text>
      </View>
    );
  }

  renderFooter = () => {
    return (
      <View style={styles.buttonUpsellContainer}>
        <AppButton
          onPress={this.onPressAddItem}
          width={158}
          height={34}
          backgroundColor={Colors.buttonMain}
          disabled={false}>
          <AppText textWeight={`${(Platform.OS === 'ios') ? '600' : '500'}`} style={styles.buttonUpsellText}>Add a Medication</AppText>
        </AppButton>
      </View>
    )
  }

  renderRowItem = (data, index) => {
    const item = data.item;

    return (
      <TouchableHighlight
        onPress={() => this.onPressItem(item, index)}
        activeOpacity={0.6}
        underlayColor={Colors.white}>
        <View style={styles.cellContainer}>
          <View>
            <AppText textWeight="600" style={styles.textMedicine}>
              {item.name}
            </AppText>
            <AppText textWeight="600" style={styles.textDose}>
              <AppText textWeight="400" style={styles.textDose}>
                Reminders:{' '}
              </AppText>
              ON
            </AppText>
          </View>
          <View style={styles.cellRight}>
            <Image style={Globals.iconChevron} source={images.iconChevron} />
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { isLoading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="Medications & Times" onPressBack={this.onPressBack} />
        <LoaderList loading={isLoading} />
        {!isLoading ? (
          <View style={styles.container}>
            <FlatList
              ref={ref => {
                this.listRef = ref;
              }}
              stickySectionHeadersEnabled={false}
              removeClippedSubviews
              initialNumToRender={20}
              onEndReachedThreshold={1200}
              keyExtractor={this.keyExtractor}
              extraData={this.state}
              data={data}
              renderItem={this.renderRowItem}
              ListEmptyComponent={this.listEmptyComponent}
              ListFooterComponent={this.renderFooter}
            />
          </View>
        ) : null}
      </SafeAreaView>
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

const mapStateToProps = state => ({
  subRole: state.auth.subRole
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MedicationRemindersViewMedicines);
