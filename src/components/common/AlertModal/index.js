import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Toaster from '../Toaster'
import styles from './AlertModal.styles';

import * as AlertActions from '@ducks/alert';

class AlertModal extends Component {
  constructor(props) {
    super(props);

    this.hideToast = this.hideToast.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { alert } = this.props;
    return alert !== nextProps.alert
  }

  hideToast() {
    const { actions } = this.props;

    actions.clearAlertModal();
  }

  render() {
    const { type, message } = this.props;

    if (message === '') {
      return null;
    }

    let notification = {};
    if (type === 'success') {
      notification = { styles: { container: styles.successContainer, text: styles.successMessage }, text: message }
    } else {
      notification = { styles: { container: styles.errorContainer, text: styles.errorMessage }, text: message }
    }

    let duration;
    if (type === 'longDuration') {
      duration = 6000;
    } else {
      duration = 2000;
    }

    return <Toaster message={notification} duration={duration} onHide={this.hideToast} />;
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
  message: state.alert.messageModal,
  type: state.alert.type
});

AlertModal.propTypes = {
  alert: PropTypes.objectOf(PropTypes.any),
  message: PropTypes.string,
  type: PropTypes.string
};

AlertModal.defaultProps = {
  alert: '',
  message: '',
  type: 'success'
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertModal);

