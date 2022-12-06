import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import {
  PersonTopSection,
  CustomHeaderBack,
  HelpModal
} from '@components/common';
import SafeAreaView from 'react-native-safe-area-view';
import { Colors } from '@constants/GlobalStyles';
import styles from './CaregiverHome.styles';
import images from '../../assets/images';

class CaregiverHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHelpModalOpen: false
    };
  }

  onPressEdit = () => {
    console.log('onPressEdit press');
  };

  onPressServices = () => {
    console.log('onPressServices press');
  };

  onPressHelp = () => {
    this.setState({
      isHelpModalOpen: true
    });
  };

  onPressCancel = () => {
    this.setState({
      isHelpModalOpen: false
    });
  };

  render() {
    const { auth } = this.props;
    const { isHelpModalOpen } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <CustomHeaderBack title="" onPressHelp={this.onPressHelp} />
        <ScrollView>
          <PersonTopSection
            user={auth}
            onPressEdit={this.onPressEdit}
            onPressServices={this.onPressServices}
          />
        </ScrollView>
        <HelpModal
          onPressCancel={this.onPressCancel}
          isModalOpen={isHelpModalOpen}
          helpText="Vim ea aeque accusam, no cum sale graeci facilisi. Affert suavitate repudiare sit at, mel id iusto iudico oporteat. Pri unum quas vituperatoribus at, id est prompta omittam. Apeirian verterem est ne, eu qui unum definitiones. Quo te ignota definiebas, at mel justo omittam, ea adhuc causae discere nec. Mutat noster verear at cum, graecis posidonium mea eu."
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(CaregiverHome);
