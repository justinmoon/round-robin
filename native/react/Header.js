import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

export default class Header extends Component {
  render() {
    const leftText = '';
    const centerText = 'Prompt';
    const rightText = 'Submit';
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.button}>{leftText}</Text>
        <Text style={styles.title}>{centerText}</Text>
        <Text style={styles.button}>{rightText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: 50,
    textAlign: 'center',
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
