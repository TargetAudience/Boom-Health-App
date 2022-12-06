import React, {Component} from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import images from '@assets/images';
import {AppButton, CheckmarkToggle, AppText} from '@components/common';
import {Colors} from '@constants/GlobalStyles';
import styles from './AllergiesModal.styles';

const {width, height} = Dimensions.get('screen');

class AllergiesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedGluten: false,
      checkedDairyCow: false,
      checkedDairySheep: false,
      checkedNuts: false,
      checkedShellfish: false,
      checkedPork: false,
      checkedLowFibre: false,
    };
  }

  onPressAllergiesSave = () => {
    const {
      checkedGluten,
      checkedDairyCow,
      checkedDairySheep,
      checkedNuts,
      checkedShellfish,
      checkedPork,
      checkedLowFibre,
    } = this.state;

    let count = 0;
    if (checkedGluten) {
      count++;
    }
    if (checkedDairyCow) {
      count++;
    }
    if (checkedDairySheep) {
      count++;
    }
    if (checkedNuts) {
      count++;
    }
    if (checkedShellfish) {
      count++;
    }
    if (checkedPork) {
      count++;
    }
    if (checkedLowFibre) {
      count++;
    }

    const allergiesState = {
      checkedGluten,
      checkedDairyCow,
      checkedDairySheep,
      checkedNuts,
      checkedShellfish,
      checkedPork,
      checkedLowFibre,
    };

    this.props.onPressCloseSave({allergiesState, allergiesCount: count});
  };

  toggleAllergy = allergy => {
    const {
      checkedGluten,
      checkedDairyCow,
      checkedDairySheep,
      checkedNuts,
      checkedShellfish,
      checkedPork,
      checkedLowFibre,
    } = this.state;

    switch (allergy) {
      case 'checkedGluten':
        this.setState({checkedGluten: !checkedGluten});
        break;
      case 'checkedDairyCow':
        this.setState({checkedDairyCow: !checkedDairyCow});
        break;
      case 'checkedDairySheep':
        this.setState({checkedDairySheep: !checkedDairySheep});
        break;
      case 'checkedNuts':
        this.setState({checkedNuts: !checkedNuts});
        break;
      case 'checkedShellfish':
        this.setState({checkedShellfish: !checkedShellfish});
        break;
      case 'checkedPork':
        this.setState({checkedPork: !checkedPork});
        break;
      case 'checkedLowFibre':
        this.setState({checkedLowFibre: !checkedLowFibre});
        break;
    }
  };

  render() {
    const {
      isModalOpen,
      onPressClose,
      buttonOneWidth,
      buttonOneLabel,
      titleText,
      modalHeight,
      scrollHeight,
    } = this.props;
    const {
      checkedGluten,
      checkedDairyCow,
      checkedDairySheep,
      checkedNuts,
      checkedShellfish,
      checkedPork,
      checkedLowFibre,
    } = this.state;

    return (
      <Modal
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isModalOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={onPressClose}>
        <View style={[styles.modalContent, {height: modalHeight}]}>
          {onPressClose ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressClose}
              style={styles.closeContainer}>
              <Image
                style={styles.close}
                source={images.close}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : null}
          <AppText textWeight="600" style={styles.titleText}>
            {titleText}
          </AppText>
          <View style={styles.contentContainer}>
            <View style={[styles.scrollViewContainer, {height: scrollHeight}]}>
              <ScrollView>
                <AppText textWeight="400" style={styles.instructionsText}>
                  Please advise us of any dietary restrictions.
                </AppText>
                <View style={styles.deliveryContainer}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.toggleAllergy('checkedGluten')}
                    style={styles.deliveryInner}>
                    <CheckmarkToggle
                      checked={Boolean(checkedGluten)}
                      onPress={() => this.toggleAllergy('checkedGluten')}
                    />
                    <AppText textWeight="400" style={styles.textCheckmark}>
                      Gluten Free
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.toggleAllergy('checkedDairyCow')}
                    style={styles.deliveryInner}>
                    <CheckmarkToggle
                      checked={Boolean(checkedDairyCow)}
                      onPress={() => this.toggleAllergy('checkedDairyCow')}
                    />
                    <AppText textWeight="400" style={styles.textCheckmark}>
                      No Dairy (Cow)
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.toggleAllergy('checkedDairySheep')}
                    style={styles.deliveryInner}>
                    <CheckmarkToggle
                      checked={Boolean(checkedDairySheep)}
                      onPress={() => this.toggleAllergy('checkedDairySheep')}
                    />
                    <AppText textWeight="400" style={styles.textCheckmark}>
                      No Dairy (Sheep/Goat)
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.toggleAllergy('checkedNuts')}
                    style={styles.deliveryInner}>
                    <CheckmarkToggle
                      checked={Boolean(checkedNuts)}
                      onPress={() => this.toggleAllergy('checkedNuts')}
                    />
                    <AppText textWeight="400" style={styles.textCheckmark}>
                      Nut Free
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.toggleAllergy('checkedShellfish')}
                    style={styles.deliveryInner}>
                    <CheckmarkToggle
                      checked={Boolean(checkedShellfish)}
                      onPress={() => this.toggleAllergy('checkedShellfish')}
                    />
                    <AppText textWeight="400" style={styles.textCheckmark}>
                      No Shellfish
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.toggleAllergy('checkedPork')}
                    style={styles.deliveryInner}>
                    <CheckmarkToggle
                      checked={Boolean(checkedPork)}
                      onPress={() => this.toggleAllergy('checkedPork')}
                    />
                    <AppText textWeight="400" style={styles.textCheckmark}>
                      No Pork
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.toggleAllergy('checkedLowFibre')}
                    style={styles.deliveryInner}>
                    <CheckmarkToggle
                      checked={Boolean(checkedLowFibre)}
                      onPress={() => this.toggleAllergy('checkedLowFibre')}
                    />
                    <AppText textWeight="400" style={styles.textCheckmark}>
                      Low Fibre Friendly
                    </AppText>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.cancelLinkContainer}>
            <AppButton
              style={styles.buttonPatient}
              onPress={this.onPressAllergiesSave}
              width={buttonOneWidth}
              height={36}
              backgroundColor={Colors.buttonMain}
              disabled={false}>
              <AppText
                textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`}
                style={styles.buttonText}>
                {buttonOneLabel}
              </AppText>
            </AppButton>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AllergiesModal;
