import React, {Component} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Image,
  Text,
  Platform,
} from 'react-native';
//import MixpanelManager from '@utils/Analytics';
import {
  CustomHeaderBack,
  AppButton,
  LoadingModalB,
  ModalRename,
  LoadingUpload,
} from '@components/common';
import {Actionsheet, Box} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import images from '@assets/images';
import styles from './Documents.styles';
import DocumentsCell from './DocumentsCell.js';
import {Colors} from '@constants/GlobalStyles';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import {checkPermission} from './checkPermission';
import {PERMISSIONS} from 'react-native-permissions';
import shortid from 'shortid';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import DocumentsLibApi from '@api/documentsLibApi';

import * as AuthActions from '@ducks/auth';
import * as AlertActions from '@ducks/alert';

import {documentsLibUrl} from '@lib/Settings';

const LIST_TYPES = [
  DocumentPicker.types.csv,
  DocumentPicker.types.doc,
  DocumentPicker.types.docx,
  DocumentPicker.types.pdf,
  DocumentPicker.types.ppt,
  DocumentPicker.types.pptx,
  DocumentPicker.types.xls,
  DocumentPicker.types.xlsx,
  DocumentPicker.types.zip,
  DocumentPicker.types.plainText,
  DocumentPicker.types.images,
  DocumentPicker.types.audio,
  DocumentPicker.types.video,
];

class Documents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: [],
      actionLoading: false,
      actionLoadingView: false,
      pullRefreshing: false,
      isRenameModalOpen: false,
      renameDocumentItem: null,
      showUploader: false,
      progressVal: 0,
      isOpen: false,
      selectedItem: null,
    };
    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const {addListener} = this.props.navigation;

    this.listeners = [addListener('didFocus', this.handleDidFocus)];

    this.loadData();
    ////this.mixpanel.track('View Documents');
  }

  componentWillUnmount() {
    this.listeners.forEach(sub => sub.remove());
  }

  handleDidFocus = () => {
    const {actions, flagDocumentsUpdate} = this.props;

    if (flagDocumentsUpdate === 1) {
      this.loadData();
      actions.clearDocumentsUpdate();
    }
  };

  loadData() {
    this.setState({actionLoading: true});

    DocumentsLibApi.getDocuments()
      .promise.then(result => {
        const documents = result.data.documents;
        this.setState({
          documents,
          pullRefreshing: false,
          actionLoading: false,
        });
      })
      .catch(error => {
        this.setState({pullRefreshing: false});
      });
  }

  onPullToRefresh = () => {
    this.setState({pullRefreshing: true}, () => {
      this.loadData();
    });
  };

  onPressRename = item => {
    this.setState({
      isRenameModalOpen: true,
      renameDocumentItem: item,
    });
  };

  onPressCloseUploadModal = item => {
    this.setState({
      showUploader: false,
      progressVal: 0,
    });
  };

  callbackRenamed = () => {
    const {actions} = this.props;

    this.loadData();
    actions.setAlert('The document has been renamed.');
    return;
  };

  onPressCancel = () => {
    this.setState({
      isRenameModalOpen: false,
      renameDocumentItem: null,
    });
  };

  onPressDocument = item => {
    const {actions} = this.props;

    const url = `${documentsLibUrl}${item.folderName}/${item.fileName}`;
    const extension = this.getUrlExtension(url);
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

    this.setState({actionLoadingView: true});

    const options = {
      fromUrl: encodeURI(url),
      toFile: localFile,
    };

    const optionsB = {
      showOpenWithDialog: true,
      displayName: item.title,
      onDismiss: () => {},
    };

    RNFS.downloadFile(options)
      .promise.then(() => {
        FileViewer.open(localFile, optionsB)
          .then(() => {
            this.setState({actionLoadingView: false});
          })
          .catch(error => {
            this.setState({actionLoadingView: false});
            console.log('error1', error);
            actions.setAlert('No viewer was found for this document type.');
          });
      })
      .then(() => {})
      .catch(error => {
        console.log('error2', error);
      });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  onPressMenu = item => {
    this.setState({
      isOpen: true,
      selectedItem: item,
    });
  };

  onPressActionSheet = buttonIndex => {
    const {actions} = this.props;
    const {selectedItem} = this.state;

    if (buttonIndex === 3) {
      this.onClose();
    } else if (buttonIndex === 2) {
      this.setState({actionLoading: true});

      DocumentsLibApi.removeDocument({documentId: selectedItem.documentId})
        .promise.then(result => {
          const documents = result.data.documents;
          this.setState({
            documents,
            actionLoading: false,
          });
          actions.setAlert('The document has been removed.');
        })
        .catch(error => {
          this.setState({actionLoading: false});
        });
    } else if (buttonIndex === 1) {
      this.onPressRename(selectedItem);
    } else if (buttonIndex === 0) {
      this.setState({actionLoading: true});

      DocumentsLibApi.emailDocument({documentId: selectedItem.documentId})
        .promise.then(() => {
          this.setState({
            actionLoading: false,
          });
          actions.setAlert('The document has been sent to your email.');
        })
        .catch(error => {
          this.setState({actionLoading: false});
        });
    }
    this.onClose();
  };

  getUrlExtension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  attachFileFromFiles = async () => {
    const {actions} = this.props;

    let isPermissionGranted = false;
    if (!global.__DEV__) {
      if (Platform.OS === 'ios') {
        isPermissionGranted = await checkPermission(
          PERMISSIONS.IOS.MEDIA_LIBRARY,
        );
      } else {
        isPermissionGranted = await checkPermission(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
      }
    } else {
      isPermissionGranted = true;
    }

    if (isPermissionGranted) {
      try {
        let res = await DocumentPicker.pick({
          type: LIST_TYPES,
          allowMultiSelection: false,
        });
        res = res[0];

        this.setState({progressVal: 0, showUploader: true});

        // 50 MB = 52428800, 75 MB = 78643200
        if (res.size > 78643200) {
          actions.setAlert(
            'The document you have selected is too large. Please be sure your document is smaller than 75 MB.',
          );
          return;
        }

        if (Platform.OS === 'android') {
          const destPath = `${
            RNFS.TemporaryDirectoryPath
          }/${shortid.generate()}`;
          await RNFS.copyFile(res.uri, destPath);
          res.uri = destPath;
        }

        const attachment = {uri: res.uri, type: res.type, name: res.name};

        const uploadPhoto = await DocumentsLibApi.sendDocument(
          attachment,
          this.onUploadProgress,
        );
        const result = JSON.parse(uploadPhoto.data);

        setTimeout(() => {
          this.setState({progressVal: 0, showUploader: false});
        }, 800);

        if (result.result === 'ok') {
          this.loadData();
        } else {
          setTimeout(() => {
            actions.setAlert(result.message);
          }, 1000);
          return;
        }
      } catch (error) {
        if (DocumentPicker.isCancel(error)) {
          this.setState({progressVal: 0, showUploader: false});
        } else {
          throw error;
        }
      }
    }
  };

  onUploadProgress = progress => {
    const progressVal = parseInt(
      Math.round((progress.loaded * 100) / progress.total),
      10,
    );
    if (progressVal > 0 && progressVal <= 100) {
      this.setState({progressVal});
    }
  };

  renderBlankState = () => {
    return (
      <View style={styles.blankStateContainer}>
        <Image
          style={styles.imageBlankStateDocuments}
          source={images.blankStateDocuments}
          resizeMode="cover"
        />
        <Text style={styles.blankStateText}>You have no documents</Text>
        <Text style={styles.blankStateTextB}>
          Securely store and share important documents with your family members.
        </Text>
        <AppButton
          onPress={this.attachFileFromFiles}
          width={210}
          height={38}
          backgroundColor={Colors.buttonMain}
          disabled={false}>
          <Text style={styles.buttonText}>Add Your First Document</Text>
        </AppButton>
      </View>
    );
  };

  renderItem = (data, index) => {
    const item = data.item;
    return (
      <View style={styles.cellContainer}>
        <DocumentsCell
          item={item}
          onPress={() => this.onPressDocument(item, index)}
          onPressMenu={() => this.onPressMenu(item, index)}
        />
      </View>
    );
  };

  render() {
    const {
      showUploader,
      progressVal,
      pullRefreshing,
      actionLoading,
      actionLoadingView,
      documents,
      isRenameModalOpen,
      renameDocumentItem,
      isOpen,
    } = this.state;

    return (
      <>
        <SafeAreaInsetsContext.Consumer>
          {insets => (
            <View style={[styles.container, {paddingTop: insets.top}]}>
              <CustomHeaderBack
                title="Documents"
                hasLoading
                loading={actionLoading && !pullRefreshing}
                customRightText="Add"
                onPressCustomRight={this.attachFileFromFiles}
              />
              <FlatList
                ref={ref => {
                  this.listRef = ref;
                }}
                contentContainerStyle={styles.list}
                numColumns={2}
                data={documents}
                initialNumToRender={5}
                maxToRenderPerBatch={30}
                windowSize={101}
                onEndReachedThreshold={1200}
                disableVirtualization={false}
                bounces
                showsVerticalScrollIndicator={false}
                decelerationRate="fast"
                scrollEventThrottle={1}
                removeClippedSubviews
                automaticallyAdjustContentInsets={false}
                keyExtractor={item => `key_${item.documentId}`}
                renderItem={this.renderItem}
                refreshControl={
                  <RefreshControl
                    refreshing={pullRefreshing}
                    onRefresh={this.onPullToRefresh}
                  />
                }
                ListEmptyComponent={this.renderBlankState}
              />
              <ModalRename
                onPressCancel={this.onPressCancel}
                isModalOpen={isRenameModalOpen}
                documentItem={renameDocumentItem}
                callbackRenamed={this.callbackRenamed}
              />
              <LoadingModalB visible={actionLoadingView} text="Loading" />
            </View>
          )}
        </SafeAreaInsetsContext.Consumer>
        <LoadingUpload
          visible={showUploader}
          current={progressVal}
          target={100}
          onPressCancel={this.onPressCloseUploadModal}
        />
        <Actionsheet
          isOpen={isOpen}
          onClose={this.onClose}
          size="full"
          hideDragIndicator="true">
          <Actionsheet.Content bg="#f3f3f3">
            <Actionsheet.Item
              _pressed={{bg: '#e8e8e8'}}
              alignItems={'center'}
              bg="transparent"
              onPress={() => {
                this.onPressActionSheet(0);
              }}>
              <Box w="100%" h={7} px={4} justifyContent="center">
                <Text style={styles.textActionSheet}>Email Document</Text>
              </Box>
            </Actionsheet.Item>
            <View style={styles.divider} />
            <Actionsheet.Item
              _pressed={{bg: '#e8e8e8'}}
              alignItems={'center'}
              bg="transparent"
              onPress={() => {
                this.onPressActionSheet(1);
              }}>
              <Box w="100%" h={7} px={4} justifyContent="center">
                <Text style={styles.textActionSheet}>Edit Name</Text>
              </Box>
            </Actionsheet.Item>
            <View style={styles.divider} />
            <Actionsheet.Item
              _pressed={{bg: '#e8e8e8'}}
              alignItems={'center'}
              bg="transparent"
              onPress={() => {
                this.onPressActionSheet(2);
              }}>
              <Box w="100%" h={7} px={4} justifyContent="center">
                <Text style={styles.textActionSheet}>Remove Document</Text>
              </Box>
            </Actionsheet.Item>
            <View style={styles.divider} />
            <Actionsheet.Item
              _pressed={{bg: '#e8e8e8'}}
              alignItems={'center'}
              bg="transparent"
              onPress={() => {
                this.onPressActionSheet(3);
              }}>
              <Box w="100%" h={7} px={4} justifyContent="center">
                <Text style={styles.textActionSheetCancel}>Cancel</Text>
              </Box>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </>
    );
  }
}

const mapStateToProps = state => ({
  flagDocumentsUpdate: state.auth.flagDocumentsUpdate,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...AlertActions,
      ...AuthActions,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
