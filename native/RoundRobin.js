/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import {
  AppState,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import { Modal, Router, Reducer, Scene, Actions } from 'react-native-router-flux'
import { Provider, connect } from 'react-redux'

import store from './store'

import editor from './editor'
import login from './login'
import community from './community'

import analytics from './analytics'
import appState from './appState'
import connectivity from './connected'

import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen'

import config from './config'
import Raven from 'raven-js'
import Icon from 'react-native-vector-icons/FontAwesome';

require('raven-js/plugins/react-native')(Raven)

if (config.ENABLE_SENTRY) {
  Raven
    .config(config.SENTRY_URL, { release: 'TODO' })
    .install()
}
import { Client } from 'bugsnag-react-native';

import TabIcon from './components/TabIcon';

const RouterWithRedux = connect()(Router)

// global._fetch = fetch;
// global.fetch = function(uri, options, ...args) {
//   return global._fetch(uri, options, ...args).then((response) => {
//     console.log('Fetch <' + uri + '>', { request: { uri, options, ...args }, response });
//     return response;
//   });
// };

const createReducer = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // FIXME: excluding loading screen because store isn't hydrated yet ..
    const blacklist = ['loading', 'compositions']
    if (action.type == "REACT_NATIVE_ROUTER_FLUX_FOCUS" && blacklist.indexOf(action.scene.name) === -1) {
      store.dispatch(analytics.actions.screen(action.scene.name))
    }
    return defaultReducer(state, action);
  };
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    // iOS "shadows"
    shadowColor: '#acacac',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // Android "shadows"
    // elevation: 5, // invisible for lower tab bar ...
  },
  nestedTabBarOverrides: {
    top: 0,
  },
  tabBarSelectedItemStyle: {
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  purpleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8a3ab9',
  },
  yellowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fccc63',
  },
  redContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e95950',
  },
  redVioletContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bc2a8d',
  },
});

const Screen = ({s, title}) => {
  return (
    <View style={s}>
      <Text style={styles.welcome}>
        {title}
      </Text>
    </View>
  );
}


const Private = () => <Screen title='Private'/>
const Published = () => <Screen s={styles.redVioletContainer} title='Published'/>



class WriteIcon extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      color: '#a9a9a9',
    }
  }
  darken() {
    console.log('dark')
    this.setState({ color: 'black' });
  }
  lighten() {
    this.setState({ color: '#a9a9a9' })
  }
  render() {
    return (
      <TouchableWithoutFeedback 
        onPressIn={() => this.darken()} 
        onPressOut={() => this.lighten()}
        onPress={this.props.onPress}
      >
        <Icon name="plus-square" color={this.state.color} size={35} />
      </TouchableWithoutFeedback>
    )
  }
}

export default class RoundRobin extends Component {
  constructor(opts) {
    super(opts);
    this.client = new Client('b192f3dc0336014568d0cc1db8761df6');
  }
  onReceived(notification) {
    console.log("Notification received: ", notification);
  }
  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body)
    console.log('Data: ', openResult.notification.payload.additionalData)
    console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult);

    const data = openResult.notification.payload.additionalData
    if (data.event === 'new-composition') {
      Actions.composition({compositionId: data.compositionId})
    }
  }  
  listenForConnectivity() {
    // FIXME: teardown
    const callback = connected => store.dispatch(connectivity.connectivityChange(connected))
    connectivity.listen(callback)
  }
  componentDidMount() {
    this.listenForConnectivity()
    AppState.addEventListener('change', console.log)
    OneSignal.configure({});
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);

  }
  componentWillUnmount() {
    AppState.removeEventListener('change', console.log)
  }
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux createReducer={createReducer} >
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideNavBar={true}>

            <Scene key="loading" component={login.components.Loading} initial />
            
            <Scene key="login" component={login.components.Container} />
            <Scene key="editor" direction='vertical' component={editor.components.Container} />
            <Scene key="community" component={community.components.Container} />
            <Scene key="composition" direction='vertical' component={community.components.Composition} />
            <Scene key="communityExplanation" component={community.components.Explanation} />

            <Scene key="lowerTabs" >
              <Scene
                key="lowerTabsMain"
                tabs
                tabBarStyle={styles.tabBarStyle}
                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              >
                <Scene 
                  initial
                  key="friends" 
                  component={community.components.Container} 
                  hideNavBar 
                  title="Friends" 
                  icon={TabIcon} 
                />
                <Scene 
                  key="write" 
                  title="Write" 
                  icon={WriteIcon}
                  onPress={() => Actions.editor()}
                />
                <Scene key="me" title="Me" hideNavBar icon={TabIcon} >
                  <Scene
                    key="meTabs"
                    tabs
                    tabBarStyle={[styles.tabBarStyle, styles.nestedTabBarOverrides]}
                    tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                  >
                    <Scene
                      key="mePrivate"
                      title="Private"
                      component={Private}
                      icon={TabIcon}
                    />
                    <Scene 
                      initial 
                      key="mePublished" 
                      title="Published" 
                      component={Published} 
                      icon={TabIcon}
                    />
                  </Scene>
                </Scene>
              </Scene>
            </Scene>

          </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('RoundRobin', () => RoundRobin)
