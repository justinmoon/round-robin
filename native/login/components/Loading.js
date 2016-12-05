import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import connectivity from '../../connected'

import login from '../index'
import editor from '../../editor'
import users from '../../users'


const mapStateToProps = (state) => {
  return {
    loggedIn: users.selectors.loggedIn(state),
    loggedOut: users.selectors.loggedOut(state),
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPrompts: () => dispatch(editor.actions.fetchPrompts()),
    fetchCurrentUser: () => {
      dispatch(login.actions.fetchCurrentUser())
        .then(() => Actions.editor())
        .catch(() => Actions.login())  // FIXME: check that it was actually an auth problem ...
    },
    listenForConnectivity: () => {
      const callback = connected => dispatch(connectivity.connectivityChange(connected))
      connectivity.listen(callback)
    },
  }
}

class Loading extends Component {
  componentWillMount() {
    // this.props.dispatch(login.actions.logout())

    // mount network listeners
    this.props.listenForConnectivity()

    this.props.fetchPrompts()
    this.props.fetchCurrentUser()

    // hide the splash screen
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
