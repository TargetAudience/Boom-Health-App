import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './LoadingModalB.styles';

const LoadingModalB = ({ visible, text }) => {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{text}</Text>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator animating={true} size="small" color="#fff" />
        </View>
      </View>
    </View>
  );
};

LoadingModalB.propTypes = {
  visible: PropTypes.bool.isRequired
};

export default LoadingModalB;
