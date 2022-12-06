import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toaster from '../Toaster'
import styles from './Alert.styles';

class Alert extends Component {
  constructor(props) {
    super(props);

    this.hideToast = this.hideToast.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { alert } = this.props;
    return alert !== nextProps.alert
  }

  hideToast() {
    // console.log('hideToast');
  }

  render() {
    const { type, message } = this.props;

    if (message === '') {
      return null;
    }

    let notification = {};
    if (type === 'success' || type === 'longDuration') {
      notification = { styles: { container: styles.successContainer, text: styles.successMessage }, text: message }
    } else {
      notification = { styles: { container: styles.errorContainer, text: styles.errorMessage }, text: message }
    }

    let duration;
    if (type === 'longDuration') {
      duration = 6500;
    } else if (type === 'mediumDuration') {
      duration = 4000;
    } else {
      duration = 2000;
    }

    return <Toaster message={notification} duration={duration} onHide={this.hideToast} />;
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
  message: state.alert.message,
  type: state.alert.type
});

Alert.propTypes = {
  alert: PropTypes.objectOf(PropTypes.any),
  message: PropTypes.string,
  type: PropTypes.string
};

Alert.defaultProps = {
  alert: '',
  message: '',
  type: 'success'
};

export default connect(
  mapStateToProps,
  null
)(Alert);
