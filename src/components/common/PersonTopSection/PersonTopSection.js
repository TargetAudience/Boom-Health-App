import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { AppText } from '@components/common';
import images from '@assets/images';
import styles from './PersonTopSection.styles';

class PersonTopSection extends Component {
  constructor(props) {
    super(props);
  }

  renderNameAndTitle(me, personName) {
    return (
      <View style={styles.heartInner}>
        <AppText textWeight="600" style={styles.sectionHeadingText}>
          {me}, caring for {personName}
        </AppText>
        <Image style={styles.heartsImage} source={images.hearts} />
      </View>
    );
  }

  render() {
    const { user, profile } = this.props;
    const { patient } = profile;
    const showCaringFor = user.subRole == 'lovedOne' || user.subRole == 'familyMember' ? true : false;

    if (user.isUserSignedIn && showCaringFor) {
      let personName = '';
      if (patient.patientsFirstName && patient.patientsFirstName !== '') {
        personName = `${patient.patientsFirstName} ${patient.patientsLastName}`;
      }
      if (personName) {
        return <View style={styles.container}>{this.renderNameAndTitle(user.firstName, personName)}</View>;
      }
    }
    return null;
  }
}

export default PersonTopSection;
