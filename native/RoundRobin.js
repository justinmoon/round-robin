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
import Community from './react/Community.js';
import Swipe from './react/Swipe.js';


export default class RoundRobin extends Component {
  render() {

    var component = <EditorContainer/>;
    var component = <Community/>;

    return (
      <View style={{ flex: 1 }}>
        {component}
      </View>
    );
  }
}

AppRegistry.registerComponent('RoundRobin', () => RoundRobin);
