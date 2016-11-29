import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import login from '../index'

const mapStateToProps = (state) => {
  return {
    connected: state.connected
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => dispatch(login.actions.login()).then(Actions.editor),
  }
}

class Container extends Component {
  componentWillMount() {
    SplashScreen.hide()
  }
  render () {
    return (
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <View style={{ flex: 0.80 }}>
        <login.components.Marketing />
        </View>
        <View style={{ flex: 0.20 }}>
        <login.components.Button onPress={this.props.login}/>
        </View>
      </View>
    )
  }
}

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container)

export default ConnectedContainer
