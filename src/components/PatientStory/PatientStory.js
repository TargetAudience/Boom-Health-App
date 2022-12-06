import React, {Component} from 'react';
import {View, ScrollView, TouchableHighlight, Image} from 'react-native';
import {AppText, ScreenWrapper} from '@components/common';
import {SafeAreaView} from 'react-native-safe-area-context';
//import MixpanelManager from '@utils/Analytics';
import styles from './PatientStory.styles';
import images from '@assets/images';

export default class PatientStory extends Component {
  constructor(props) {
    super(props);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    //this.mixpanel.track('View Lisas Story');
  }

  onPressClose = () => {
    const {navigation} = this.props;

    navigation.pop();
  };

  render() {
    return (
      <ScreenWrapper backgroundTopColor="#f06cb9">
        <ScrollView style={styles.container}>
          <View style={styles.containerTop}>
            <TouchableHighlight
              onPress={this.onPressClose}
              underlayColor="transparent"
              hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
              <Image style={styles.iconClosePink} source={images.closePink} />
            </TouchableHighlight>
            <View style={styles.centerImage}>
              <Image style={styles.profilePhoto} source={images.lisaPhoto} />
              <Image
                style={styles.lisasStoryScriptImage}
                source={images.lisasStoryScript}
              />
              <AppText textWeight="400" style={styles.textStoryIntro}>
                We've been through what you've been through!
              </AppText>
              <AppText textWeight="400" style={styles.textStoryBody}>
                Boom founder Lisa Assaf designed this app in Toronto after
                caring for her aging father.
              </AppText>
              <Image style={styles.heartsImage} source={images.hearts} />
            </View>
          </View>
          <View style={styles.containerBottom}>
            <AppText textWeight="300" style={styles.textBody}>
              In early 2015, Lisa Assaf, founder of the Boom app and a former
              family law lawyer, was facing a life-altering challenge that many
              Canadians are all too familiar with - organizing care for a loved
              one. Her father, living alone in his late seventies, was diagnosed
              with cancer. So began a journey experienced by many; navigating a
              labyrinth of appointments, bookings, and making choices about
              services to support an aging or unwell family member.
            </AppText>
            <AppText textWeight="300" style={styles.textBody}>
              By the time the journey was completed, sadly with the death of her
              father, Lisa had a deep appreciation for how difficult this was
              for Canadians, especially those with jobs, children, and other
              responsibilities. "I remember the day of my father’s discharge
              after surgery, being handed a large stack of paper with all kinds
              of instructions, and realizing it was up to my sister and I to
              organize a system of care personalized to him. Balancing the
              demands of family life, employment, and caring for a loved one can
              be challenging, especially when services are not readily available
              without playing an extended game of telephone tag! I remember
              feeling overwhelmed and alone."
            </AppText>
            <AppText textWeight="300" style={styles.textBody}>
              This prompted Lisa to create Boom, a comprehensive marketplace to
              book vetted in-home care needs, at a time when so much of home
              care would also benefit from modernization.
            </AppText>
            <AppText textWeight="300" style={styles.textBody}>
              "Giving back time to people to spend with a loved one is what this
              is all about", says Lisa.
            </AppText>
            <AppText textWeight="300" style={styles.textBody}>
              She wanted to help all those who are experiencing what she
              experienced, but make their journey easier and more simplified,
              offering a one-stop digital companion to assist with care needs.
              During this COVID-19 Pandemic, the need for this support and
              innovation could not be more apparent.
            </AppText>
            <AppText textWeight="300" style={styles.textBody}>
              Lisa spent the last couple of years working with a patient and
              family advisory group at Sunnybrook Health Sciences Centre, one of
              Canada's leading hospitals.
            </AppText>
            <AppText
              textWeight="500"
              style={[
                styles.textBody,
                styles.textBodyItalic,
                styles.textBodyNoGap,
              ]}>
              "It was a blessing to know Lisa's father, and to see the good
              intent behind her care for him, which we see in so many patients.
              It's remarkable here that this care has translated into something
              innovative to help so many, easing the responsibility of preparing
              to care for someone at home. Boom is a platform that provides what
              families need and will help hospitals with discharge planning as
              well. Sunnybrook is proud to have been a part of this effort."
            </AppText>
            <AppText
              textWeight="500"
              style={[styles.textBody, styles.textBodyIndent]}>
              - Dr. Calvin Law, Chief, Odette Cancer Centre, Sunnybrook Health
              Sciences Centre
            </AppText>
          </View>
        </ScrollView>
      </ScreenWrapper>
    );
  }
}
