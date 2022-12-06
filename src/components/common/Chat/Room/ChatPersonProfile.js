import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { parse, formatDistance, parseISO } from 'date-fns';
import { ImageLoad, AppText } from '@components/common';
import images from './../../../../assets/images';
import styles from './ChatPersonProfile.styles';

class ChatPersonProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, onPress, roomInfo, profile } = this.props;

    const chatWith = roomInfo.chatWith;
    const thumb = roomInfo.thumb;
    const showMenu = profile.admin === 0;

    return (
      <View style={styles.cell}>
        <View style={styles.thumbWrap}>
          <ImageLoad
            emptyBg={images.personRowPlaceholder}
            style={styles.imageThumb}
            source={{ uri: thumb }}
          />
        </View>
        <View style={styles.column}>
          <AppText textWeight="500" style={styles.textName}>{chatWith}</AppText>
          <AppText textWeight="300" style={styles.textMembersCount}>{data.participantCount} members</AppText>
        </View>
        {showMenu ? 
          <TouchableHighlight
            onPress={onPress}
            underlayColor="transparent"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <AppText textWeight="800" style={styles.textEllipsis}>}>...</AppText>
          </TouchableHighlight>
        : null}
        <Image style={styles.whiteNotch} source={images.whiteNotch} />
      </View>
    );
  }
}

export default ChatPersonProfile;