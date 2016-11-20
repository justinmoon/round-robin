/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import EditorContainer from './react/Container.js';
import Test from './react/Test.js';


export default class RoundRobin extends Component {
  render() {

    var component = <EditorContainer/>;
    // var component = <Test/>;

    return (
      <View style={{ flex: 1 }}>
        {component}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RoundRobin', () => RoundRobin);
