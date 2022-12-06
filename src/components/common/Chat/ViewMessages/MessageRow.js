import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types';
import { ImageLoad, Indicator, AppText } from '@components/common';
import images from './../../../../assets/images';
import { parse, formatDistance, parseISO } from 'date-fns';
import { Colors } from '@constants/GlobalStyles';
import styles from './MessageRow.styles';

class MessageRow extends Component {
  render() {
    const { onClick, hereNow, data, lastMessage, roomInfo, unreadCount } = this.props;

    const item = data;
    const readStyle = unreadCount > 0 ? styles.cellUnread : '';
    const isOnline = hereNow.includes(item.id) ? true : false;

    let messageText = '';
    let timeAgo = '';
    if (lastMessage) {
      messageText = lastMessage.text;
      timeAgo = formatDistance(parseISO(lastMessage.createdAt, 'yyyy-MM-dd HH:mm:ss', new Date()), new Date(), { addSuffix: true });
    }

    let chatWith = roomInfo.chatWith;
    let thumb = roomInfo.thumb;

    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <View style={styles.cellContainer}>
          <View style={[styles.cell, readStyle]}>
            <View style={styles.thumbWrap}>              
              <ImageLoad
                emptyBg={images.personRowPlaceholder}
                style={styles.imageThumb}
                source={{ uri: thumb }}
              />
              {isOnline ?
                <View style={styles.imageIndicatorView}>
                  <Image style={styles.imageIndicator} source={images.iconStatusAvailable} resizeMode="cover" />
                </View>
              : null}
            </View>
            <View style={styles.column}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <AppText textWeight="500" style={styles.textName}>{chatWith}</AppText>
                  <AppText textWeight="300" numberOfLines={2} style={styles.textMessage}>{messageText}</AppText>
                </View>
                <View>
                  <AppText textWeight="300" style={styles.textDate}>{timeAgo}</AppText>
                  <Indicator
                    color={Colors.buttonMain}
                    numberText={unreadCount}
                    style={styles.indicator}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default MessageRow;
