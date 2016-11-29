import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import login from '../index'

const mapStateToProps = (state) => {
  return {
    connected: state.connected,
    loggingIn: login.selectors.loggingIn(state),
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
    const bottomContent = this.props.loggingIn ?
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

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container)

export default ConnectedContainer
