import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { queries, selectors } from 'common'
import { connectRequest } from 'redux-query'
import SplashScreen from 'react-native-splash-screen'

import login from '../index'
import users from '../../users'

const mapStateToProps = (state) => {
  const loggingIn = login.selectors.loggingIn(state)
  const loggedIn = users.selectors.loggedIn(state)
  const isFetchingCurrentUser = selectors.isFetchingCurrentUser(state)
  const showSpinner = loggingIn || isFetchingCurrentUser
  return {
    showSpinner,
    loggedIn,
    state,
    loggingIn: login.selectors.loggingIn(state),
    currentUser: selectors.getCurrentUser(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => dispatch(login.actions.login())
      .catch(err => {
        // UI reacts to redux state.
        // TODO: I wish navigation were same way, instead in this imperative way.
        // If the smallest promise error goes undetected, we navigate to a view that should require authentication
        // User will get trapped in the editor view ... very bad
        // Maybe this navigation should happen within "componentWillReceiveProps"
        console.log('login failed: ', err)
      })
  }
}

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    // TODO: if there is a currentUser, redirect somewhere else
    console.log(nextProps.state.currentUser)
    if (nextProps.state.currentUser && nextProps.state.currentUser.id) {
      Actions.lowerTabs({type: 'reset'})
      setTimeout(SplashScreen.hide, 250)  // a little breathing room
    }
    if (nextProps.currentUser === {}) {
      SplashScreen.hide()
    }
  }
  render () {
    const bottomContent = this.props.showSpinner ?
        <ActivityIndicator size="large" /> :
        <login.components.Button onPress={this.props.login}/>
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <View style={{ flex: 0.80 }}>
        <login.components.Marketing />
        </View>
        <View style={{ flex: 0.20 }}>
          {bottomContent}
        </View>
      </View>
    )
  }
}

const LoginContainer = connectRequest(queries.fetchCurrentUser)(Login)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer)
