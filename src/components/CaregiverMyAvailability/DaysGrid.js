import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DaysGridItem from './DaysGridItem';

export default class DaysGrid extends Component {
  constructor() {
    super();
    this.state = {
      days: [false, false, false, false, false, false, false]
    };
  }

  UNSAFE_componentWillReceiveProps(newprops) {
    if (newprops.resetGrid) {
      this.setState({
        days: [false, false, false, false, false, false, false]
      });
    }
  }

  onPress(item) {
    const { data, disabled, onGridSelected } = this.props;
    const { days } = this.state;

    if (!disabled) {
      let newDays = [...days];

      if (newDays[item]) {
        newDays[item] = false;
      } else {
        newDays[item] = true;
      }

      this.setState({ days: newDays });
      onGridSelected(newDays);
    }
  }

  render() {
    const { data, disabled } = this.props;

    const opacityStyle = disabled ? styles.dim : '';

    let gridItems = data.map((info, i) => (
      <DaysGridItem
        info={data[i].label}
        index={i}
        key={i}
        on={this.state.days[i]}
        onPress={() => this.onPress(i)}
      />
    ));
    return <View style={[styles.container, opacityStyle]}>{gridItems}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  dim: {
    opacity: 0.5
  }
});
