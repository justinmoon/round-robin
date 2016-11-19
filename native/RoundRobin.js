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
import * as firebase from 'firebase';

import EditorContainer from './react/Container.js';

const config = {
  apiKey: "AIzaSyCR6BydlVwkDyJmg45BzNN_wInKKr27iHs",
  authDomain: "round-robin-a58a3.firebaseapp.com",
  databaseURL: "https://round-robin-a58a3.firebaseio.com",
  storageBucket: "round-robin-a58a3.appspot.com",
  messagingSenderId: "36675682146"
};
const firebaseApp = firebase.initializeApp(config);

export default class RoundRobin extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <EditorContainer/>
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
