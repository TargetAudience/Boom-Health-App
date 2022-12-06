import React, { Component } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import { AppText } from '@components/common';
import images from '@assets/images';

const styles = StyleSheet.create({
  icon: { width: 20, height: 20 },
  text: { fontSize: 15 }
});

export default class CustomMultiPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageWidth: Dimensions.get('window').width,
      pageHeight: Dimensions.get('window').height,
      searchText: null,
      selected: []
    };
  }

  componentDidMount = () => {
    const selected = this.props.selected;


    if (typeof selected === 'object') {
      selected.map(select => {
        this._onSelect(select);
      });
    } else {

      this._onSelect(selected);
    }
  };

  componentDidUpdate = (prevProps) => {

    if (prevProps != this.props) {

      if (this.props.selected.length === 0) {
        this.setState({
          selected: []
        });
      }

    }
  };





  getNewDimensions(event) {
    var pageHeight = event.nativeEvent.layout.height;
    var pageWidth = event.nativeEvent.layout.width;
    this.setState({
      pageHeight,
      pageWidth
    });
  }

  _onSelect = item => {
    var selected = this.state.selected;
    if (this.props.multiple) {
      if (selected.indexOf(item) == -1) {
        selected.push(item);
        this.setState({
          selected: selected
        });
      } else {
        selected = selected.filter(i => i != item);
        this.setState({
          selected: selected
        });
      }
    } else {
      if (selected.indexOf(item) == -1) {
        selected = [item];
        this.setState({
          selected: selected
        });
      } else {
        selected = [];
        this.setState({
          selected: selected
        });
      }
    }
    this.props.callback(selected);
  };

  _isSelected = item => {
    const selected = this.state.selected;
    if (selected.indexOf(item) == -1) {

      return false;
    }

    return true;
  };

  generateKey = pre => {
    return `${pre}_${new Date().getTime()}`;
  };

  render() {
    const { options, returnValue } = this.props;
    const list = options;
    const labels = Object.keys(list).map(i => {
      return list[i].name;
    });
    const values = Object.keys(list).map(i => {
      return list[i].id;
    });
    return (
      <View style={
        { flex: 1,  }}
        onLayout={evt => {
          this.getNewDimensions(evt);
        }}>
        <ScrollView
          style={[
            { flex: 1,  },
            this.props.scrollViewStyle
          ]}>
          {labels.map((label, index) => {
            const itemKey = returnValue == 'label' ? label : values[index];
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={this.generateKey(itemKey)}
                style={[
                  {
                    padding: 0,
                    marginTop: 0,
                    paddingLeft: 16,
                    paddingRight: 16,
                    marginBottom: 0,
                    backgroundColor: this.props.rowBackgroundColor,
                    height: this.props.rowHeight,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomColor: '#ebeff1',
                    borderBottomWidth: 1
                  },
                  this.props.itemStyle
                ]}
                onPress={() => {
                  this._onSelect(itemKey);
                }}>
                <AppText style={[styles.text, {fontFamily: 'SFProText', fontWeight: '400'}]}>
                  {label}
                </AppText>
                {this._isSelected(itemKey) ? (
                  <Image source={images.iconChecked} style={styles.icon} />
                ) : (
                  <Image source={images.iconUnchecked} style={styles.icon} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
