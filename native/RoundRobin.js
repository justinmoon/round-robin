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

import store from './store'

import editor from './editor'
import login from './login'
import community from './community'

const RouterWithRedux = connect()(Router)


// global._fetch = fetch;
// global.fetch = function(uri, options, ...args) {
//   return global._fetch(uri, options, ...args).then((response) => {
//     console.log('Fetch <' + uri + '>', { request: { uri, options, ...args }, response });
//     return response;
//   });
// };

export default class RoundRobin extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux style={{ flex: 1 }}>
          <Scene key="root" hideNavBar={true}>
            <Scene key="loading" component={login.components.Loading} initial={true} />
            <Scene key="login" component={login.components.Container} />
            <Scene key="editor" component={editor.components.Container} />
            <Scene key="community" component={community.components.Container} />
            <Scene key="communityExplanation" component={community.components.Explanation} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('RoundRobin', () => RoundRobin)
