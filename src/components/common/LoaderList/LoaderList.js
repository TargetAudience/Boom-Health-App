import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import styles from './LoaderList.styles';

const LoaderList = props => {
  const { loading } = props;

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#6f757f" size="small" animating />
      </View>
    )
  }
  return null;
}

LoaderList.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default LoaderList;
