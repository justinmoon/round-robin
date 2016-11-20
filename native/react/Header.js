import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { header as styles } from './styles.js';

export default class Header extends Component {
  render() {
    const leftText = '';
    const centerText = this.props.title;
    const rightText = 'Submit';
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.button}>{leftText}</Text>
        <Text style={styles.title}>{centerText}</Text>
        <TouchableOpacity onPress={this.props.handleSubmit} >
          <Text style={styles.button}>{rightText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
