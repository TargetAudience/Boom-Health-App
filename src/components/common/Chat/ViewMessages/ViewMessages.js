import React, {Component} from 'react';
import {
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
//import MixpanelManager from '@utils/Analytics';
import PropTypes from 'prop-types';
import {SwipeListView} from 'react-native-swipe-list-view';
import {PubSubContext} from 'src/pubsub';
import {
  CustomHeaderBack,
  LoaderList,
  GenericModal,
  AppText,
} from '@components/common';
import _ from 'lodash';
import images from './../../../../assets/images';
import MessageRow from './MessageRow';
import styles from './ViewMessages.styles';
import {profilePhotosUrl} from '@lib/Settings';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

import * as PubNubActions from '@ducks/pubnub';
import * as SettingsActions from '@ducks/settings';

class ViewMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionLoading: false,
      chats: props.chats,
      data: '',
      hereNow: props.hereNow,
      lastMessages: props.lastMessages,
      isModalOpen: false,
    };

    this.handleMessage = this.handleMessage.bind(this);

    //this.mixpanel = MixpanelManager.sharedInstance.mixpanel;
  }

  componentDidMount() {
    const {settings} = this.props;
    const {isModalOpen} = this.state;
    this.setState({
      isModalOpen: settings.hasShownChatPopup === 0 ? true : false,
    });

    ////this.mixpanel.track('View Chat Home');
  }

  componentDidUpdate(prevProps) {
    const {hereNow, lastMessages} = this.props;

    if (
      hereNow !== prevProps.hereNow ||
      lastMessages !== prevProps.lastMessages
    ) {
      this.setState({hereNow, lastMessages});
    }
  }

  handleMessage(message) {
    //console.debug('inside handleMessage', message)
  }

  onPressMessageRow(item) {
    const {navigation} = this.props;

    const roomInfo = this.getRoomInfo(item);

    navigation.navigate('MessagingSpace', {item, roomInfo, newChat: false});
  }

  onPressHelp() {}

  onPressCancel = () => {
    const {actions} = this.props;

    this.setState({isModalOpen: false});
    actions.setChatPopupShown();
  };

  getRoomInfo = item => {
    const {auth} = this.props;
    let chatWith = '';
    let thumb = '';

    if (item.roomType) {
      if (item.roomType === 'family') {
        const person = item.participants.find(val => val.thumb !== '');
        if (person && person.thumb) {
          thumb = `${profilePhotosUrl}${person.thumb}`;
        } else if (auth.signedInPhoto && auth.signedInPhoto) {
          thumb = `${profilePhotosUrl}${auth.signedInPhoto}`;
        }
        chatWith = 'My Family Chat';
      } else if (item.roomType === 'personalCare') {
        const person = item.participants.find(
          val => val.subRole === 'personalCare',
        );
        chatWith = 'Personal Care Chat with ' + person.name;
        thumb = `${profilePhotosUrl}${person.thumb}`;
      }
    } else {
      chatWith = item.roomType;
    }

    return {
      chatWith,
      thumb,
    };
  };

  renderRow = row => {
    const {hereNow, lastMessages, unreads} = this.props;

    const item = row.item;
    const id = item.roomName;
    const unreadCount = unreads[id];
    const roomInfo = this.getRoomInfo(item);

    let lastMessage = '';
    if (!_.isNil(lastMessages[id])) {
      lastMessage = lastMessages[id];
    }

    return (
      <MessageRow
        onClick={() => this.onPressMessageRow(item)}
        unreadCount={unreadCount}
        roomInfo={roomInfo}
        hereNow={hereNow}
        lastMessage={lastMessage}
        data={item}
      />
    );

    return null;
  };

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  async deleteRow(data, rowMap) {
    const {pubsub} = this.context;
    const {actions} = this.props;

    const otherPersonId = data.item[0].id;
    const myselfId = pubsub.getUUID();
    const spaceId = data.item[0].spaceId;
    this.closeRow(rowMap, otherPersonId);

    //actions.removeChat(otherPersonId);
    //const leaveSpace = await pubsub.leaveSpace({ id: myselfId, spaceId: spaceId });
    //if (leaveSpace.statusCode === 200) {
    //console.log('leaveSpace', leaveSpace)
    //}
  }

  renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => this.deleteRow(data, rowMap)}>
        <Image source={images.iconTrash} style={styles.imageTrash} />
      </TouchableOpacity>
    </View>
  );

  listEmptyComponent() {
    return (
      <View style={styles.blankStateContainer}>
        <Image
          style={styles.blankStateMessages}
          source={images.blankStateMessages}
        />
        <Text style={styles.blankStateText}>You have no messages.</Text>
      </View>
    );
  }

  render() {
    const {chats} = this.props;
    const {
      isModalOpen,
      messages,
      actionLoading,
      loading,
      hereNow,
      lastMessages,
    } = this.state;

    const showList = !actionLoading;

    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => (
          <View style={[styles.container, {paddingTop: insets.top}]}>
            <CustomHeaderBack title="Messages" />

            <LoaderList loading={actionLoading} />

            {showList ? (
              <View style={styles.containerB}>
                <SwipeListView
                  useFlatList={true}
                  keyExtractor={item => String(item.roomName)}
                  data={chats}
                  extraData={hereNow || lastMessages}
                  renderItem={this.renderRow}
                  renderHiddenItem={this.renderHiddenItem}
                  closeOnRowPress
                  recalculateHiddenLayout
                  disableRightSwipe
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  ListEmptyComponent={this.listEmptyComponent}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            ) : null}
            <GenericModal
              onPressOne={this.onPressCancel}
              buttonOneLabel={'OK'}
              isModalOpen={isModalOpen}
              onPressCloseButton={this.onPressCancel}
              titleText="Family Chat"
              buttonOneWidth={120}
              modalHeight={240}
              scrollHeight={155}
              helpText={
                "Invite family members or others to join a private and secure chat group to help coordinate your or your loved one's health needs. You can invite others to join in the Settings tab."
              }
            />
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
  static contextType = PubSubContext;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {...PubNubActions, ...SettingsActions},
      dispatch,
    ),
  };
}

const mapStateToProps = state => ({
  pubnub: state.pubnub,
  channels: state.channels,
  messages: state.pubnub.messages,
  auth: state.auth,
  settings: state.settings,
  chats: state.pubnub.chats,
  hereNow: state.pubnub.hereNow,
  lastMessages: state.pubnub.lastMessages,
  unreads: state.pubnub.unreads,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewMessages);
