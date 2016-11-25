/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Router, Scene } from 'react-native-router-flux'
import { Provider, connect } from 'react-redux'

// import Test from './react/Test.js';
import Community from './react/Community'
import Loading from './react/Loading'

import store from './store'

import editor from './editor'

const RouterWithRedux = connect()(Router)

export default class RoundRobin extends Component {
  render() {
    // return <Test />
    return (
      <Provider store={store}>
        <RouterWithRedux style={{ flex: 1 }}>
          <Scene key="root" hideNavBar={true}>
            <Scene key="loading" component={Loading} initial={true} />
            <Scene key="editor" component={editor.components.Container} />
            <Scene key="community" component={Community} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('RoundRobin', () => RoundRobin)
