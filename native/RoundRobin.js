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
import { Router, Scene } from 'react-native-router-flux';

// import Test from './react/Test.js';
import EditorContainer from './react/Container.js';
import Community from './react/Community.js';

export default class RoundRobin extends Component {
  render() {
    return (
      <Router style={{ flex: 1 }}>
        <Scene key="root" hideNavBar={true}>
        <Scene key="editor" component={EditorContainer} initial={true} />
        <Scene key="community" component={Community} />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('RoundRobin', () => RoundRobin);
