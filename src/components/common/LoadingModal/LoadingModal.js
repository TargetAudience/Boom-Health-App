import React from 'react';
import { Modal, View } from 'react-native';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import styles from './LoadingModal.styles';

const LoadingModal = ({ visible, color }) => (
  <Modal transparent animationType="fade" visible={visible}>
    <View style={styles.modalBackground}>
      <LoadingIndicator color={color} size={34} style={{ flex: 0 }} />
    </View>
  </Modal>
);

LoadingModal.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default LoadingModal;
