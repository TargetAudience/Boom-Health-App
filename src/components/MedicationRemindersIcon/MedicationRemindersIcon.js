import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import Carousel from 'react-native-snap-carousel';
//import MixpanelManager from '@utils/Analytics';
import { CustomHeaderBack, AppText } from '@components/common';
import { Colors } from '@constants/GlobalStyles';
import images from '@assets/images';
import styles from './MedicationRemindersIcon.styles';

import * as AlertActions from '@ducks/alert';

const width = Math.round(Dimensions.get('window').width);

const data = [
  images.pillRound,
  images.pillFootball,
  images.pillOval,
  images.pillPlastic,
  images.pillOther1,
  images.pillOther2,
  images.pillOther3,
  images.pillOther4,
  images.pillOther5,
  images.pillOther6
];

const dataColors = [
  images.pillColor1,
  images.pillColor2,
  images.pillColor3,
  images.pillColor4,
  images.pillColor5,
  images.pillColor6,
  images.pillColor7,
  images.pillColor8,
  images.pillColor9,
  images.pillColor10,
  images.pillColor11,
  images.pillColor12
];

class MedicationRemindersIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      medicationTypeSelected: 0,
      medicationColorASelected: 3,
      medicationColorBSelected: 0,
      firstClicked: false,
      secondClicked: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    this._carousel.triggerRenderingHack();
    this._carouselB.triggerRenderingHack();

   // //this.mixpanel.track('View Medication Reminders Icon');
  }

  onPressMedicationType = item => {
    this.setState({ firstClicked: true, medicationTypeSelected: item });
    this._carousel.snapToItem(item);
  };

  onPressColorA = item => {
    this.setState({ secondClicked: true, medicationColorASelected: item });
    this._carouselB.snapToItem(item);
  };

  onPressBack = () => {
    const { actions, navigation } = this.props;

    navigation.goBack('');
  };

  medicationTypeStyle = item => {
    const { medicationTypeSelected } = this.state;

    if (medicationTypeSelected === item) {
      return styles.itemSelected;
    }
    return null;
  };

  colorAStyle = item => {
    const { medicationColorASelected } = this.state;

    if (medicationColorASelected === item) {
      return styles.itemSelected;
    }
    return null;
  };

  medicationTypeImage = (image, index) => {
    const { medicationTypeSelected, medicationColorASelected } = this.state;

    if (index === 0 && medicationTypeSelected === 0 && medicationColorASelected == 4) {
      return images.pillRoundOrange
    }
    if (index === 0 && medicationTypeSelected === 0 && medicationColorASelected == 3) {
      return images.pillRoundYellow;
    }
    return image;
  };

  render() {
    const { currentIndex, firstClicked, secondClicked, medicationTypeSelected, medicationColorASelected } = this.state;

    const renderItemWidth = 80;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack
          title="Icon"
          onPressBack={this.onPressBack}
        />
        <View style={styles.containerB}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            removeClippedSubviews={false}
            containerCustomStyle={styles.carouselContainer}
            activeSlideAlignment={'center'}
            initialNumToRender={data.length}
            maxToRenderPerBatch={6}
            sliderWidth={width}
            itemWidth={renderItemWidth}
            data={data}
            layout={'default'}
            enableSnap
            useScrollView
            firstItem={firstClicked || medicationTypeSelected}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity activeOpacity={1} onPress={() => this.onPressMedicationType(index)}>
                  <View style={[styles.cardContainer, { width: renderItemWidth }]} key={`image_${index}`}>
                    <View style={this.medicationTypeStyle(index)}>
                      <Image source={this.medicationTypeImage(item, index)} style={styles.cardImage} resizeMode={'contain'} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <Carousel
            ref={c => {
              this._carouselB = c;
            }}
            removeClippedSubviews={false}
            containerCustomStyle={styles.carouselContainerB}
            activeSlideAlignment={'center'}
            initialNumToRender={dataColors.length}
            maxToRenderPerBatch={6}
            sliderWidth={width}
            itemWidth={renderItemWidth}
            data={dataColors}
            layout={'default'}
            enableSnap
            useScrollView
            firstItem={secondClicked || medicationColorASelected}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity activeOpacity={1} onPress={() => this.onPressColorA(index)}>
                  <View style={[styles.cardContainer, { width: renderItemWidth }]} key={`image_${index}`}>
                    <View style={this.colorAStyle(index)}>
                      <Image source={item} style={styles.cardImage} resizeMode={'contain'} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />

        </View>
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
)(MedicationRemindersIcon);
