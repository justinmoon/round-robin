import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { queries, selectors } from 'common'
import { connectRequest } from 'redux-query'
import SplashScreen from 'react-native-splash-screen'
import moment from 'moment'

import components from '../components'
import { login as loginAction } from '../actions'

const mapStateToProps = (state) => {
  return {
    loggedIn: selectors.loggedIn(state),
    isLoggingIn: state.async.loggingIn,
    currentUser: selectors.getCurrentUser(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => dispatch(loginAction())
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@connectRequest(queries.fetchCurrentUser)
export default class Login extends Component {
  componentWillReceiveProps ({ currentUser, loggedIn }) {
    if (loggedIn) {
      // No matter what, we leave login and enter the tabbed view
      Actions.lowerTabs({type: 'reset'})

      // If they're new, have them write first
      if (currentUser.needs_onboarding) {
        Actions.compose()
      }

      setTimeout(SplashScreen.hide, 250)  // a little breathing room
    }
    else {
      SplashScreen.hide()
    }
  }
  render () {
    const bottomContent = this.props.isLoggingIn
        ? <ActivityIndicator size='large' />
        : <components.LoginButton onPress={this.props.login} />
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
