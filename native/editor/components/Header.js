import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from '../../react/styles'
import timer from '../../timer'
import components from '../../react'

export default class Header extends Component {
  renderRightComponent() {
    // TODO: alerts
    if (this.props.submitting) {
      return (
        <ActivityIndicator style={{ width: 60, textAlign: 'center' }} size="small" />
      )
    } else if (this.props.reachedTargetDuration) {
      return (
        <TouchableOpacity onPress={this.props.handleSubmit} >
          <Text style={styles.header.button}>Submit</Text>
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
      <View style={styles.header.container}>
        <StatusBar hidden />
        <Text style={styles.header.button}></Text>
        <Text style={styles.header.title}>{this.props.title}</Text>
        <View style={{ width: 60 }}>
          {this.renderRightComponent()}
        </View>
      </View>
    );
  }
}
