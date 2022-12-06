import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Platform,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import {AppText, AppButton, HeaderWavy, BackArrow} from '@components/common';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import {Colors} from '@constants/GlobalStyles';
import styles from './PatientOrderTransportationSales.styles';
import images from '@assets/images';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

const {width} = Dimensions.get('screen');

const firstFlav =
  'M0,128L80,122.7C160,117,320,107,480,122.7C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z';

class PatientOrderTransportationSales extends Component {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    analytics().logScreenView({
      screen_name: 'patient_order_transportation_sales_page',
      screen_class: 'patient_order_transportation_sales_page',
    });

    //this.mixpanel.track('View Patient Order Transportation Sales Page');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressNext = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientOrderTransportation');
  };

  render() {
    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.container, {paddingTop: insets.top}]}>
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
                    Give Your Loved One a Renewed Sense of Freedom and Security
                  </AppText>
                  <AppText textWeight={'400'} style={styles.headingB}>
                    with Boom Transportation Services
                  </AppText>
                </View>

                <AppText textWeight={'400'} style={styles.textBody}>
                  With Boom, you can book and manage all of your transportation
                  needs in a fast efficient manner. Whether you require
                  assistance to get to medical appointments, family gatherings
                  or shopping for groceries, Boom is your trusted transportation
                  companion. Transportation services are booked by the hour and
                  can be be booked same day or in advance. Accessible vehicles
                  are available upon request.
                </AppText>

                <AppText textWeight={'400'} style={styles.textBody}>
                  Further, with Boom's tracking system, you will be able to
                  follow the journey of your loved one, giving you peace of mind
                  knowing when they have reached their destination and returned
                  safely home.
                </AppText>

                <View style={styles.photoContainer}>
                  <Image
                    style={styles.photo}
                    source={images.salesImageTransportation}
                  />
                </View>
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
                      BOOK NOW
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

export default PatientOrderTransportationSales;
