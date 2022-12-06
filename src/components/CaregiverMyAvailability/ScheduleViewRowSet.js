import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { Colors } from '@constants/GlobalStyles';

export default class ScheduleViewRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRowHighlighted: false
    };
  }

  rowHighlighted() {
    this.setState({ isRowHighlighted: true });
  }

  rowNormal(key) {
    const { onPress } = this.props;

    this.setState({ isRowHighlighted: false });
    onPress(key);
  }

  isRowHighlighted() {
    if (this.state.isRowHighlighted) {
      return styles.rowHighlighted;
    } else {
      return styles.rowNormal;
    }
  }

  isTextHighlighted() {
    if (this.state.isRowHighlighted) {
      return styles.textHighlighted;
    } else {
      return styles.textNormal;
    }
  }

  renderTimes(times) {
    if (times.length) {
      let timeArr = [];
      let count = 0;
      for (let value of times) {
        const time = `${value.start} to ${value.end}`;
        timeArr.push(
          <Text
            key={count++}
            style={[styles.textTime, this.isTextHighlighted()]}>
            {time}
          </Text>
        );
      }
      return <View style={styles.timeWrap}>{timeArr}</View>;
    } else {
      return (
        <Text style={[styles.textTime, this.isTextHighlighted()]}>
          UNAVAILABLE
        </Text>
      );
    }
  }

  render() {
    const { data, defaultTimes } = this.props;

    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.rowHighlighted()}
        onPressOut={() => this.rowNormal(data.key)}>
        <View style={[styles.row, data.styles, this.isRowHighlighted()]}>
          <View style={styles.leftSideContents}>
            <Text style={[styles.textLabel, this.isTextHighlighted()]}>
              {data.label.toUpperCase()}
            </Text>
          </View>
          <View style={styles.rightSideContents}>
            {this.renderTimes(defaultTimes)}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  rowHighlighted: {
    backgroundColor: Colors.titleTextMain
  },
  rowNormal: {
    backgroundColor: '#fff'
  },
  textHighlighted: {
    color: '#ffffff'
  },
  textNormal: {
    color: '#000000'
  },
  timeWrap: {
    justifyContent: 'flex-end',
    marginVertical: 4
  },
  row: {
    flex: 1,
    borderBottomColor: '#e8e8e8',
    borderTopColor: '#e8e8e8',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  leftSideContents: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
  },
  textLabel: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400'
  },
  textTime: {
    color: '#000',
    fontSize: 12.5,
    lineHeight: 13 * 1.4,
    textAlign: 'right',
    fontWeight: '500'
  },
  rightSideContents: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});
