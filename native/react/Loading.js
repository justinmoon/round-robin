import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { fetchCreations } from '../redux/creations.js'
import { fetchPrompts } from '../redux/prompts.js'

const mapStateToProps = (state) => {
  return {
    creations: state.creations.creations,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hydrate: () => {
      return Promise.all([
        dispatch(fetchCreations()),
        dispatch(fetchPrompts())
      ])
    },
  }
}


class Loading extends Component {
  componentWillMount() {
    this.props.hydrate().then(Actions.editor)
  }
  render () {
    return (
      <Text style={{ fontSize: 100 }}>Loading</Text>
    )
  }
}

const ConnectedLoading = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loading)

export default ConnectedLoading
