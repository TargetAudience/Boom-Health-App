import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import AppText from '../AppText';
import styles from './LoaderListMessage.styles';

const LoaderListMessage = props => {
  const { loading, message } = props;

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <AppText style={[styles.messageText, {fontFamily: 'SFProText', fontWeight: '600'}]}>{message}</AppText>
        </View>
        <ActivityIndicator color="#6f757f" size="small" animating />
      </View>
    )
  }
  return null;
}

LoaderListMessage.propTypes = {
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default LoaderListMessage;
