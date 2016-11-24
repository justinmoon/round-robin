import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { header as styles } from './styles.js';
import timer from '../timer'
import components from './index'

export default class Header extends Component {
  renderRightComponent() {
    if (this.props.submitting) {
      return (
        <ActivityIndicator style={{ width: 60, textAlign: 'center'}} size="small" />
      )
    } else if (this.props.reachedTargetDuration) {
      return (
        <TouchableOpacity onPress={this.props.handleSubmit} >
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      )
    } else {
      const finalOpacity = (this.props.countingDown) ? 1 : 0
      return (
        <components.FadingView finalOpacity={finalOpacity} >
          <timer.components.Timer timer={this.props.timer} tick={this.props.tick} />
        </components.FadingView>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.button}></Text>
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={styles.button}>
        {this.renderRightComponent()}
        </View>
      </View>
    );
  }
}
