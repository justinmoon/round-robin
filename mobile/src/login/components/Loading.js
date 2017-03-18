import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import login from '../index'
import { fetchCurrentUser } from '../actions'


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchCurrentUser: () => {
      dispatch(fetchCurrentUser())
      // FIXME: only navigate if it wasn't opened from a push notification
        .then(() => Actions.lowerTabs())
        .catch(() => Actions.login())  // FIXME: check that it was actually an auth problem ...
        .finally(() => SplashScreen.hide())
    },
  }
}

class Loading extends Component {
  componentWillMount() {
    // this.props.dispatch(login.actions.logout())
    // setTimeout(Actions.login, 1000)
    this.props.fetchCurrentUser()
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
