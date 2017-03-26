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
    isLoggingIn: selectors.isLoggingIn(state),
    currentUser: selectors.getCurrentUser(state),
    redirectToLogin: selectors.redirectToLogin(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => dispatch(loginAction())
  }
}

class Login extends Component {
  // componentDidMount() {
    // SplashScreen.hide()
  // }
  componentWillReceiveProps ({ currentUser, loggedIn, redirectToLogin }) {
    if (loggedIn) {
      // No matter what, we leave login and enter the tabbed view
      Actions.lowerTabs({type: 'reset'})

      // If user was created within the last 5 minutes, send them to the editor
      const createdAt = moment.utc(currentUser.created_at)
      const now = moment.utc()
      const freshAccount = now.diff(createdAt, 'seconds') < 60 * 5
      if (freshAccount) {
        Actions.compose()
      }

      setTimeout(SplashScreen.hide, 250)  // a little breathing room
    }
    if (redirectToLogin) {
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

const LoginContainer = connectRequest(queries.fetchCurrentUser)(Login)
// const LoginContainer = Login

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer)
