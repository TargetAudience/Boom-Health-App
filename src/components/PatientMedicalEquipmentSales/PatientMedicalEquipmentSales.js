import React, {Component} from 'react';
import {View, ScrollView, Platform, Dimensions, Image} from 'react-native';
import {AppText, AppButton, HeaderWavy, BackArrow} from '@components/common';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import analytics from '@react-native-firebase/analytics';
import {Colors} from '@constants/GlobalStyles';
import styles from './PatientMedicalEquipmentSales.styles';
import images from '@assets/images';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

const {width} = Dimensions.get('screen');

const firstFlav =
  'M0,128L80,122.7C160,117,320,107,480,122.7C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z';

class PatientMedicalEquipmentSales extends Component {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    analytics().logScreenView({
      screen_name: 'patient_medical_equipment_sales_page',
      screen_class: 'patient_medical_equipment_sales_page',
    });

    ////this.mixpanel.track('View Patient Order Medical Equipment Sales Page');
  }

  onPressBack = () => {
    const {navigation} = this.props;

    navigation.goBack('');
  };

  onPressNext = () => {
    const {navigation} = this.props;

    navigation.navigate('PatientMedicalEquipment');
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
                    Get the Equipment You Need When You Want It
                  </AppText>
                  <AppText textWeight={'400'} style={styles.headingB}>
                    with Boom's Medical Equipment Services
                  </AppText>
                </View>

                <AppText textWeight={'400'} style={styles.textBody}>
                  Boom's curated list of medical equipment includes a wide range
                  of quality products to support your home care needs. The Boom
                  platform allows you to conveniently choose the products you
                  require with both rental and purchase options and then choose
                  your delivery window to have the items delivered right to your
                  door.
                </AppText>

                <AppText textWeight={'400'} style={styles.textBody}>
                  {' '}
                  Choose between standard or rush deliveries so that if you need
                  something right away, you won't have to wait. With rentals we
                  also offer maximum flexibility, with rental periods ranging
                  from as little as one day to multiple weeks.
                </AppText>

                <View style={styles.photoContainer}>
                  <Image
                    style={styles.photo}
                    source={images.salesImageEquipment}
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

export default PatientMedicalEquipmentSales;
