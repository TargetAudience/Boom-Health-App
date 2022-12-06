import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Platform,
  Dimensions,
  Image,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import {
  AppText,
  AppButton,
  HeaderWavy,
  BackArrow,
  AppButtonChild,
} from '@components/common';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import {Colors} from '@constants/GlobalStyles';
import styles from './PatientMealsSales.styles';
import images from '@assets/images';
//import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import {ImageGallery} from '../../../src/@georstat/react-native-image-gallery';

const {width} = Dimensions.get('screen');

export const imagesGallery = [
  {
    id: 1,
    url: images.food1,
    thumbUrl: images.food1_square,
  },
  {
    id: 2,
    url: images.food2,
    thumbUrl: images.food2_square,
  },
  {
    id: 3,
    url: images.food3,
    thumbUrl: images.food3_square,
  },
  {
    id: 4,
    url: images.food4,
    thumbUrl: images.food4_square,
  },
  {
    id: 5,
    url: images.food5,
    thumbUrl: images.food5_square,
  },
];

const firstFlav =
  'M0,128L80,122.7C160,117,320,107,480,122.7C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z';

class PatientMealsSales extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      isOpen: false,
      galleryItemIndex: 0,
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    analytics().logScreenView({
      screen_name: 'patient_meals_sales_page',
      screen_class: 'patient_meals_sales_page',
    });

    ////this.mixpanel.track('View Patient Order Meals Sales Page');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack();
  };

  onPressNext = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientMeals');
  };

  onPressGallery = num => {
    this.setState({galleryItemIndex: num, isOpen: true});
  };

  onCloseGallery = num => {
    this.setState({isOpen: false});
  };

  renderHeaderComponent = () => {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <TouchableHighlight
          style={styles.viewLeft}
          onPress={this.onCloseGallery}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
          <Image source={images.iconCloseWhite} style={styles.arrowBack} />
        </TouchableHighlight>
      </SafeAreaView>
    );
  };

  renderPhotoGrid = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 20,
            marginHorizontal: 13,
            marginBottom: 8,
            justifyContent: 'space-between',
          }}>
          <AppButtonChild
            onPress={() => this.onPressGallery(0)}
            style={styles.gridCell}>
            <Image source={images.food1_square} style={styles.gridImage} />
          </AppButtonChild>
          <AppButtonChild
            onPress={() => this.onPressGallery(1)}
            style={styles.gridCell}>
            <Image source={images.food2_square} style={styles.gridImage} />
          </AppButtonChild>
          <AppButtonChild
            onPress={() => this.onPressGallery(2)}
            style={styles.gridCell}>
            <Image source={images.food3_square} style={styles.gridImage} />
          </AppButtonChild>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginHorizontal: 13,
            marginBottom: 16,
            justifyContent: 'space-between',
          }}>
          <AppButtonChild
            onPress={() => this.onPressGallery(3)}
            style={styles.gridCell}>
            <Image source={images.food4_square} style={styles.gridImage} />
          </AppButtonChild>
          <AppButtonChild
            onPress={() => this.onPressGallery(4)}
            style={styles.gridCell}>
            <Image source={images.food5_square} style={styles.gridImage} />
          </AppButtonChild>
          <AppButtonChild
            onPress={() => this.onPressGallery(0)}
            style={styles.gridCell}>
            <View style={[styles.gridImage, styles.gridEmpty]}>
              <Image source={images.more} style={styles.moreImage} />
            </View>
          </AppButtonChild>
        </View>
      </>
    );
  };

  renderCarousel = () => {
    const {currentIndex} = this.state;

    const data = [
      images.food1,
      images.food2,
      images.food3,
      images.food4,
      images.food5,
      images.food6,
    ];

    return (
      <View style={styles.carouselContainer}>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          mode="parallax"
          width={width - 40}
          height={width / 2}
          scrollAnimationDuration={1000}
          onSnapToItem={index => this.setState(() => ({currentIndex: index}))}
          loop={false}
          data={data}
          renderItem={({index}) => {
            return (
              <View style={styles.cardContainer} key={`image_${index}`}>
                <FastImage
                  source={data[index]}
                  style={styles.cardImage}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            );
          }}
        />
        <View style={{flexDirection: 'row', marginTop: 10}}>
          {data.map((_, index) => {
            return (
              <View
                key={`${index}`}
                style={[
                  {
                    backgroundColor:
                      index === currentIndex ? Colors.titleTextMain : '#e3eaee',
                  },
                  {borderRadius: 25, width: 10, height: 10, margin: 5},
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  render() {
    const {isOpen, galleryItemIndex} = this.state;

    const showCarousel = Platform.OS === 'ios';

    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.container, {paddingTop: insets.top}]}>
              <ImageGallery
                renderHeaderComponent={this.renderHeaderComponent}
                isOpen={isOpen}
                images={imagesGallery}
                initialIndex={galleryItemIndex}
                resizeMode="contain"
                thumbColor="#fdca40"
              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.containerB}>
                <HeaderWavy
                  customStyles={styles.svgCurve}
                  customHeight={160}
                  customTop={128}
                  customBgColor="#d3e2fa"
                  customWavePattern={firstFlav}
                />
                <BackArrow backIconDark onPressBack={this.onPressBack} />
                <View style={styles.headingContainer}>
                  <AppText textWeight={'600'} style={styles.heading}>
                    Enjoy Boom's Tasty Home-cooked Meals
                  </AppText>
                  <AppText textWeight={'400'} style={styles.headingB}>
                    Prepared with wholesome fresh ingredients
                  </AppText>
                </View>

                <AppText textWeight={'400'} style={styles.textBody}>
                  From our home to yours, Boom offers freshly prepared meals
                  that are the perfect substitute for a home cooked meal. Choose
                  a minimum of 6 meals per order per delivery week. Once
                  received, simply reheat and enjoy, and any leftovers can be
                  stored to eat later. Meals are beautifully packaged and
                  delivered to your door and you can conveniently select your
                  delivery date and follow your meal delivery until it arrives!
                </AppText>

                <AppText textWeight={'400'} style={styles.textBody}>
                  With a variety of main courses to sides to snacks and more,
                  there is something for the whole family.
                </AppText>

                {!showCarousel ? this.renderPhotoGrid() : this.renderCarousel()}
              </ScrollView>
              <View style={styles.bottomContainer}>
                <View style={styles.bottomContainerInner}>
                  <AppButton
                    style={styles.button}
                    onPress={this.onPressNext}
                    width={width - 20}
                    height={42}
                    backgroundColor={Colors.buttonMain}
                    disabled={false}>
                    <AppText
                      textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                      style={styles.buttonText}>
                      ORDER NOW
                    </AppText>
                  </AppButton>
                </View>
              </View>
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
      </>
    );
  }
}

export default PatientMealsSales;
