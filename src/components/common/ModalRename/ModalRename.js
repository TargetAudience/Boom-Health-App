import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
//import MixpanelManager from '@utils/Analytics';
import { AppText } from '@components/common';
import images from '@assets/images';
import { ButtonLoading, AlertModal } from '@components/common';
import { Colors } from '@constants/GlobalStyles';

import DocumentsLibApi from '@api/documentsLibApi';

import * as AlertActions from '@ducks/alert';

const { width, height } = Dimensions.get('screen');

class ModalRename extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentName: '',
      documentItem: null,
      actionLoading: false
    };

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidUpdate(prevProps) {
    const { documentItem } = this.props;

    if (documentItem && documentItem !== prevProps.documentItem) {
      this.setState({ documentItem, documentName: documentItem.title });
    }
  }

  onPressRename = async () => {
    const { actions, onPressCancel, documentItem, callbackRenamed } = this.props;
    const { documentName } = this.state;

    if (documentName === '') {
      actions.setAlertModal('Please enter a name for this document.');
      return;
    }

    this.setState({ actionLoading: true });

    await DocumentsLibApi.renameDocument({
      documentId: documentItem.documentId,
      documentName
    })
      .promise.then(async () => {
        this.setState({ actionLoading: false, documentName: '' });
        onPressCancel();
        callbackRenamed();
        //('Rename document');
      })
      .catch(error => {
        console.log('renameDocument error', error);
        this.setState({ actionLoading: false });
        actions.setAlert(error.data.statusText);
      });
  };

  render() {
    const { isModalOpen, onPressCancel } = this.props;
    const { documentName, actionLoading } = this.state;

    return (
      <Modal
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
        isVisible={isModalOpen}
        deviceWidth={width}
        deviceHeight={height}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={onPressCancel}>
        <AlertModal />
        <KeyboardAvoidingView enabled behavior={Platform.OS === 'android' ? undefined : 'position'}>
          <View style={styles.modalContent}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPressCancel} style={styles.closeContainer}>
              <Image style={styles.close} source={images.close} resizeMode="cover" />
            </TouchableOpacity>
            <View style={styles.container}>
              <TextInput
                style={styles.textInput}
                autoCapitalize="sentences"
                autoCorrect={true}
                numberOfLines={1}
                underlineColorAndroid="transparent"
                keyboardType={'web-search'}
                textAlign="left"
                placeholder={'Enter name...'}
                placeholderTextColor="rgba(0,0,0,.3)"
                autoFocus={false}
                maxLength={500}
                value={documentName}
                onChangeText={text => this.setState({ documentName: text })}
              />
              <View style={styles.buttonContainer}>
                <ButtonLoading
                  onPress={this.onPressRename}
                  isLoading={actionLoading}
                  containerStyle={styles.buttonSignIn}>
                  <AppText textWeight={`${Platform.OS === 'ios' ? '600' : '500'}`} style={styles.buttonSignInText}>
                    Rename
                  </AppText>
                </ButtonLoading>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions
    },
    dispatch
  )
});

export default connect(null, mapDispatchToProps)(ModalRename);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 160
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 40
  },
  textInput: {
    width: width - 80,
    height: 40,
    backgroundColor: '#f1f1f1',
    color: '#000000',
    fontSize: 14,
    paddingLeft: 8,
    borderRadius: 3
  },
  buttonContainer: {
    marginTop: 10
  },
  buttonSignInText: {
    marginTop: Platform.OS === 'ios' ? 1 : -1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff'
  },
  buttonSignIn: {
    backgroundColor: Colors.buttonMain,
    borderRadius: 4,
    height: 36,
    width: 120
  },
  closeContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 9999
  },
  close: {
    width: 14,
    height: 14
  }
});
