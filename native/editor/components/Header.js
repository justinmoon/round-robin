import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import styles from '../../styles'
import timer from '../../timer'
import components from '../../components'
import { Actions } from 'react-native-router-flux'

export default class Header extends Component {
  renderLeftComponent() {
    return (
      <TouchableOpacity onPress={() => { Keyboard.dismiss(); Actions.pop()}} >
        <Text style={styles.header.buttonLeft}>Quit</Text>
      </TouchableOpacity>
    )
  }
  renderRightComponent() {
    if (this.props.submitting) {
      return (
        <ActivityIndicator style={{ width: 60 }} size="small" />
      )
    }
    return (
      <TouchableOpacity onPress={this.props.handleSubmit} >
        <Text style={styles.header.buttonRight}>Submit</Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.header.container}>
        <StatusBar hidden />
        <View style={{ width: 60 }}>
          {this.renderLeftComponent()}
        </View>
        <Text style={styles.header.title}>{this.props.title}</Text>
        <View style={{ width: 60 }}>
          {this.renderRightComponent()}
        </View>
      </View>
    );
  }
}
