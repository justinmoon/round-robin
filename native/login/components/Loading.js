import React, { Component } from 'react'
import { View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import connectivity from '../../connected'

import login from '../index'
import editor from '../../editor'
import users from '../../users'

import * as firebase from 'firebase';


const mapStateToProps = (state) => {
  return {
    loggedIn: users.selectors.loggedIn(state),
    loggedOut: users.selectors.loggedOut(state),
    loaded: Object.keys(state.prompts.prompts).length !== 0,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetch: () => {
      // TODO: factor this somewhere else
      return Promise.all([
        dispatch(editor.actions.fetchPrompts()),
      ])
    },
    listenForConnectivity: () => {
      const callback = connected => dispatch(connectivity.connectivityChange(connected))
      connectivity.listen(callback)
    },
    attachAuthStateListener: () => dispatch(users.actions.attachAuthStateListener()),
  }
}

class Loading extends Component {
  componentWillMount() {
    //this.props.dispatch(login.actions.logout())  // #testinghacks

    // mount network listeners
    this.props.listenForConnectivity()

    // fetch any data that we can while still unauthenticated
    this.props.fetch()

    // this.props.attachFirebaseAuthStateChangedListener()
    this.props.attachAuthStateListener()

    // hide the splash screen
    SplashScreen.hide()
  }
  componentWillReceiveProps({loaded, loggedIn, loggedOut}) {
    console.log(loaded, loggedIn)
    if (loaded && loggedIn) {
      return Actions.editor()
    }
    if (loggedOut) {
      return Actions.login()
    }
  }
  render() {
    return <View/>
  }
}

const ConnectedLoading = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loading)

export default ConnectedLoading
