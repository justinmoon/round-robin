import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

export default class Header extends Component {
  render() {
    const leftText = '';
    const centerText = 'Prompt';
    const rightText = '';
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
    position: 'absolute',
    top: 0,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
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
