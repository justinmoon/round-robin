import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { queries, selectors } from 'common'
import { connectRequest } from 'redux-query'
import SplashScreen from 'react-native-splash-screen'

import components from '../components'
import { login as loginAction }  from '../actions'


const mapStateToProps = (state) => {
  return {
    loggedIn: selectors.loggedIn(state),
    isLoggingIn: selectors.isLoggingIn(state),
    currentUser: selectors.getCurrentUser(state),
    redirectToLogin: selectors.redirectToLogin(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => dispatch(loginAction()),
  }
}

class Login extends Component {
  componentWillReceiveProps({ currentUser, loggedIn, redirectToLogin }) {
    if (loggedIn) {
      Actions.lowerTabs({type: 'reset'})
      setTimeout(SplashScreen.hide, 250)  // a little breathing room
    }
    if (redirectToLogin) {
      SplashScreen.hide()
    }
  }
  render () {
    const bottomContent = this.props.isLoggingIn ?
        <ActivityIndicator size="large" /> :
        <components.LoginButton onPress={this.props.login}/>
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <View style={{ flex: 0.80 }}>
        <components.Swiper />
        </View>
        <View style={{ flex: 0.20 }}>
          {bottomContent}
        </View>
      </View>
    )
  }
}

// const LoginContainer = connectRequest(queries.fetchCurrentUser)(Login)
const LoginContainer = Login

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer)
