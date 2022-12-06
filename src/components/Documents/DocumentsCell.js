import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import images from '@assets/images';

const getIcon = icon => {
  switch (icon) {
    case 'csv':
      return images.csv;
    case 'doc':
    case 'docx':
      return images.doc;
    case 'gif':
      return images.gif;
    case 'jpg':
    case 'jpeg':
      return images.jpg;
    case 'pdf':
      return images.pdf;
    case 'png':
      return images.png;
    case 'ppt':
    case 'pptx':
      return images.ppt;
    case 'rar':
      return images.rar;
    case 'rtf':
      return images.rtf;
    case 'tiff':
      return images.tiff;
    case 'txt':
      return images.txt;
    case 'xls':
    case 'xlsx':
      return images.xls;
    case 'zip':
      return images.zip;
    case 'numbers':
      return images.numbers;
    case 'pages':
      return images.pages;
    case 'mpeg':
    case 'flv':
      return images.video;
    case 'html':
      return images.html;
    case 'mp3':
    case 'wav':
    case 'mp4':
      return images.audio;
  }
};

export default class DocumentsCell extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.onPressMenu = this.onPressMenu.bind(this);
  }

  handlePress() {
    const { onPress } = this.props;
    onPress();
  }

  onPressMenu() {
    const { onPressMenu } = this.props;
    onPressMenu();
  }

  render() {
    const { item } = this.props;

    const image = getIcon(item.fileType);

    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.item}>
          <TouchableWithoutFeedback onPress={this.onPressMenu}>
            <Image style={styles.menuContainer} source={images.menuEllipsis} resizeMode="cover" />
          </TouchableWithoutFeedback>
          <AutoHeightImage width={70} source={image} />
          <Text style={styles.textTitle} numberOfLines={2} ellipsizeMode="tail">
            {item.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  statusContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 9
  },
  item: {
    backgroundColor: '#e6f0fd',
    borderRadius: 16,
    paddingBottom: 15,
    height: 156,
    alignItems: 'center',
    paddingTop: 16
  },
  textTitle: {
    marginTop: 12,
    textAlign: 'center',
    textAlignVertical: 'top',
    color: '#3d4957',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.5,
    paddingHorizontal: 10
  },
  menuContainer: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 8,
    right: 8,
    tintColor: '#8fbbf0',
    borderWidth: 2,
    borderColor: '#8fbbf0',
    borderRadius: 11
  }
});
