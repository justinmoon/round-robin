import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { submitCreation }  from '../firebase.js';
console.log(submitCreation)

export default class Header extends Component {
  handleRightPress() {
    submitCreation('Justin', 'Monkeybrains', 'body')
  }
  render() {
    const leftText = '';
    const centerText = 'Prompt';
    const rightText = 'Submit';
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.button}>{leftText}</Text>
        <Text style={styles.title}>{centerText}</Text>
        <TouchableOpacity onPress={this.handleRightPress} >
          <Text style={styles.button}>{rightText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    fontSize: 16,
    width: 60,
    textAlign: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
