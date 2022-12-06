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
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import {Colors} from '@constants/GlobalStyles';
import styles from './PatientBookCaregiversSales.styles';
import images from '@assets/images';

const {width} = Dimensions.get('screen');

const firstFlav =
  'M0,128L80,122.7C160,117,320,107,480,122.7C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z';

class PatientBookCaregiversSales extends Component {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    analytics().logScreenView({
      screen_name: 'patient_book_caregiver_sales_page',
      screen_class: 'patient_book_caregiver_sales_page',
    });

    //('View Patient Book Caregiver Sales Page');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack();
  };

  onPressNext = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientBookCaregivers');
  };

  render() {
    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View
              style={[
                styles.container,
                {paddingTop: insets.top},
              ]}>
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
                    Get Professional Home-care When You Need It
                  </AppText>
                  <AppText textWeight={'400'} style={styles.headingB}>
                    with Boom's Caregiver Services
                  </AppText>
                </View>

                <AppText textWeight={'400'} style={styles.textBody}>
                  Boom offers a wide range of caregiving services to support
                  your home-care needs. You can conveniently select the services
                  you require and Boom will offer you a selection of care
                  professionals to choose from including vetted Personal Support
                  Workers (PSW) and Registered Nurses (RN).
                </AppText>

                <AppText textWeight={'400'} style={styles.textBody}>
                  Our care offerings range from minimal assistance including
                  light housekeeping services and companionship to more
                  comprehensive assistance including private hospital care and
                  palliative care.
                </AppText>

                <AppText textWeight={'400'} style={styles.textBody}>
                  Once a booking made, you will receive a call from our Care
                  Coordinator who will review your needs to ensure that the most
                  appropriate care professional is taking care of you or your
                  loved one.
                </AppText>

                <AppText textWeight={'400'} style={styles.textBody}>
                  Services can be booked the same day or in advance. Bookings
                  can range from 1 hour to long term assistance.{'\n'}Need
                  overnight care? We do that too.
                </AppText>

                <View style={styles.photoContainer}>
                  <Image
                    style={styles.photo}
                    source={images.salesImageCaregivers}
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
        <SafeAreaView
          style={{flex: 0, backgroundColor: '#fff'}}
        />
      </>
    );
  }
}

export default PatientBookCaregiversSales;
