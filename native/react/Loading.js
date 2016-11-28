import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import editor from '../editor'
import community from '../community'
import Login from './Login.js'
import auth from '../auth'

import SplashScreen from 'react-native-splash-screen'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hydrate: () => {
      return Promise.all([
        dispatch(community.actions.fetchCompositions()),
        dispatch(editor.actions.fetchPrompts())
      ])
    },
    checkCurrentUser: auth.checkCurrentUser,
  }
}

const style = {
  fontSize: 20,
  marginTop: 5,
  fontWeight: 'bold',
}

class Loading extends Component {
  componentWillMount() {
    /* this.props.hydrate().then(Actions.editor)*/
    this.props.hydrate()
    this.props.checkCurrentUser()
    setTimeout(SplashScreen.hide, 3000)
  }
  render () {
    return (
      <View style={{ flex: 1}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={style}>
          Write freely
        </Text>
        <Text style={style}>
          About the prompt
        </Text>
        <Text style={style}>
          For 5 minutes
        </Text>
      </View>

      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
      </View> */}

      <Login onLoginSuccess={Actions.editor}/>

      </View>
    )
  }
}

const ConnectedLoading = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loading)

export default ConnectedLoading
