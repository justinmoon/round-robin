import React, { Component } from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import login from '../index'
import editor from '../../editor'


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPrompts: () => dispatch(editor.actions.fetchPrompts()),
    fetchCurrentUser: () => {
      dispatch(login.actions.fetchCurrentUser())
        .then(() => Actions.editor())
        .catch(() => Actions.login())  // FIXME: check that it was actually an auth problem ...
    },
  }
}

class Loading extends Component {
  componentWillMount() {
    // this.props.dispatch(login.actions.logout())
    this.props.fetchPrompts()
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
