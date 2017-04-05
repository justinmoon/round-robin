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
} from 'react-native'
import { Modal, Router, Reducer, Scene, Actions } from 'react-native-router-flux'
import { Provider, connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
SplashScreen.hide()

import store from './store'
import apollo from './apollo.js'

import analytics from './analytics'
import connectivity from './connected'

import OneSignal from 'react-native-onesignal'

import config from './config'
import Raven from 'raven-js'

require('raven-js/plugins/react-native')(Raven)

if (config.ENABLE_SENTRY) {
  Raven
    .config(config.SENTRY_URL, { release: 'TODO' })
    .install()
}
import {Client} from 'bugsnag-react-native'

import components from './components'
import containers from './containers'

const RouterWithRedux = connect()(Router)

const createReducer = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    // FIXME: excluding loading screen because store isn't hydrated yet ..
    const blacklist = ['loading', 'compositions']
    if (action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS' && blacklist.indexOf(action.scene.name) === -1) {
      store.dispatch(analytics.actions.screen(action.scene.name))
    }
    return defaultReducer(state, action)
  }
}

import { ApolloProvider } from 'react-apollo'

const styles = StyleSheet.create({
  container: { flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  navBarStyle: {
    backgroundColor: '#f9f9f9',
    // iOS "shadows"
    shadowColor: '#acacac',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 1.0
    // Android "shadows"
    // elevation: 5, // invisible for lower tab bar ...
  },
  tabBarStyle: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    // iOS "shadows"
    shadowColor: '#acacac',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
    // Android "shadows"
    // elevation: 5, // invisible for lower tab bar ...
  },
  nestedTabBarOverrides: {
    top: 0
  },
  tabBarSelectedItemStyle: {
  },
})

export default class RoundRobin extends Component {
  constructor (opts) {
    super(opts)
    this.client = new Client('b192f3dc0336014568d0cc1db8761df6')
  }
  onReceived (notification) {
    console.log('Notification received: ', notification)
  }
  onOpened (openResult) {
    // console.log('Message: ', openResult.notification.payload.body)
    // console.log('Data: ', openResult.notification.payload.additionalData)
    // console.log('isActive: ', openResult.notification.isAppInFocus)
    // console.log('openResult: ', openResult);

    const data = openResult.notification.payload.additionalData
    if (data.event === 'new-composition') {
      // Hack to make sure we have some scene to "go back" to
      // perhaps it'd be better to just make a default scene to go to when we try to pop last scene off the stack???
      const state = store.getState()
      if (state.router.scene.parent === '__root') {
        Actions.lowerTabs({ type: 'reset' })
      }
      SplashScreen.hide()
      Actions.composition({compositionId: data.compositionId})
    }
    if (data.event === 'reminder-to-write') {
      // Hack to make sure we have some scene to "go back" to
      // perhaps it'd be better to just make a default scene to go to when we try to pop last scene off the stack???
      const state = store.getState()
      if (state.router.scene.parent === '__root') {
        Actions.lowerTabs({ type: 'reset' })
      }
      SplashScreen.hide()
      Actions.compose()
    }
  }
  listenForConnectivity () {
    // FIXME: teardown
    const callback = connected => store.dispatch(connectivity.connectivityChange(connected))
    connectivity.listen(callback)
  }
  componentDidMount () {
    this.listenForConnectivity()
    AppState.addEventListener('change', console.log)
    OneSignal.configure({})
    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
  }
  componentWillUnmount () {
    AppState.removeEventListener('change', console.log)
  }
  render () {
    return (
      <ApolloProvider store={store} client={apollo}>
        <RouterWithRedux titleStyle={styles.titleStyle} navigationBarStyle={styles.navBarStyle} createReducer={createReducer} >
          <Scene key='modal' component={Modal} >
            <Scene key='root' hideNavBar>
              <Scene key='login' component={containers.Login} initial />
              <Scene key='compose' direction='vertical' component={containers.Compose} />
              <Scene key='composition' direction='vertical' component={containers.Composition} />

              <Scene key='lowerTabs'>
                <Scene
                  key='lowerTabsMain'
                  tabs
                  tabBarStyle={styles.tabBarStyle}
                  tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
              >
                  <Scene
                    initial
                    key='friends'
                    component={containers.Friends}
                    title='Friends'
                    icon={components.TabIcon}
                />
                  <Scene
                    key='write'
                    title='Write'
                    icon={components.WriteIcon}
                    onPress={() => Actions.compose()}
                />
                {/**<Scene
                    key='mePublished'
                    hideNavBar
                    title='Me'
                    component={containers.Published}
                    icon={components.TabIcon}
                  />**/}
                  <Scene
                    title='Me'
                    key='me'
                    hideNavBar={false}
                    icon={components.TabIcon}
                    rightTitle='settings'
                    onRight={() => Actions.settings()}
                  >
                  <Scene
                    key='mePublished'
                    hideNavBar={false}
                    component={containers.Published}
                  />
                  <Scene
                    key='writingSchedule'
                    component={components.WritingSchedule}
                    rightTitle=''
                    title='Writing Schedule'
                    onRight={() => {}}
                  />
                  <Scene
                    key='settings'
                    component={containers.Settings}
                    rightTitle=''
                    onRight={() => {}}
                  />
                </Scene>
                  {/** <Scene key="me" title="Me" hideNavBar icon={components.TabIcon} >
                  <Scene
                    key="meTabs"
                    tabs
                    tabBarStyle={[styles.tabBarStyle, styles.nestedTabBarOverrides]}
                    tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                    >
                    <Scene
                      hideNavBar
                      key="mePrivate"
                      title="Private"
                      component={Private}
                      icon={components.TabIcon}
                    />
                    <Scene
                      hideNavBar
                      initial
                      key="Me"
                      title="Published"
                      component={containers.Published}
                      icon={components.TabIcon}
                    />
                    </Scene>
                  </Scene>**/}
                </Scene>
              </Scene>
            </Scene>
          </Scene>
        </RouterWithRedux>
      </ApolloProvider>
    )
  }
}

AppRegistry.registerComponent('RoundRobin', () => RoundRobin)
