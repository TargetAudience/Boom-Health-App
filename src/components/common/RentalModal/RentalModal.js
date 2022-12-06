import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import images from '@assets/images';
import { AppText } from '@components/common';
import styles from './RentalModal.styles';
import { Colors } from '@constants/GlobalStyles';

export default class RentalModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: props.isModalOpen,
      items: props.items,
      selectedItem: props.selectedItem
    };
  }

  UNSAFE_componentWillReceiveProps(newprops) {
    if (newprops.isModalOpen) {
      this.setState({ isModalOpen: true });
    } else {
      this.setState({ isModalOpen: false });
    }
    if (newprops.selectedItem !== this.state.selectedItem) {
      this.setState({ selectedItem: newprops.selectedItem });
    }
  }

  onPressItem = item => {
    const { itemPress } = this.props;

    itemPress(item);
  }

  renderItem = (item, index, length) => {
    const { selectedItem } = this.state;

    const style = (selectedItem === item.optionId) ? styles.bold : null;
    const style2 = (index === length) ? styles.removeBorder : null;
    
    return (
      <TouchableOpacity
        key={item.optionId}
        onPress={() => this.onPressItem(item)}
        activeOpacity={0.6}>
        <View style={[styles.rowContainer, style, style2]}>
          <AppText textWeight="500" style={styles.leftLabelText}>{item.duration}</AppText>
          <AppText textWeight="500" style={styles.leftLabelText}>${item.price}</AppText>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { closePress } = this.props;
    const { isModalOpen, items, selectedItem } = this.state;

    return (
      <Modal
        ref="modal3"
        isVisible={isModalOpen}
        onModalHide={closePress}
        onBackdropPress={closePress}
        hasBackdrop
        backdropColor="black"
        backdropOpacity={0.2}
        useNativeDriver
        animationIn="fadeIn"
        animationOut="fadeOut"
        coverScreen>
        <View style={styles.wrap}>
          <View style={styles.wrapInner}>
            <TouchableOpacity onPress={closePress}>
              <Image
                style={styles.close}
                source={images.iconCloseBlack}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {items.map((item, index) => (
              this.renderItem(item)
            ))}
          </View>
        </View>
      </Modal>
    );
  }
}

