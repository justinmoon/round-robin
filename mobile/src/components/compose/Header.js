import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native'
import styles from '../../styles'
import { Actions } from 'react-native-router-flux'

export default class Header extends Component {
  render () {
    const { left, title, right } = this.props
    return (
      <View style={styles.header.container}>
        {left || <View/>}
        {title || <View/>}
        {right || <View/>}
      </View>
    )
    return (
      <View style={styles.header.container}>
        <View style={{ width: 60 }}>
          {this.renderLeftComponent()}
        </View>
        <Text style={styles.header.title}>{this.props.title}</Text>
        <View style={{ width: 60 }}>
          {this.renderRightComponent()}
        </View>
      </View>
    )
  }
}
