import React, { Component } from 'react'
import { StyleSheet, View, Keyboard } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import analytics from '../analytics'

import { selectors, actions, queries } from 'common'
import components from '../components'

const mapStateToProps = (state) => {
  return {
    prompt: selectors.getPrompt(state),
    submitting: false  // FIXME
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitComposition: (payload) => {
      dispatch(queries.submitComposition(payload)).then(() => {
        // FIXME: HACK!
        Actions.pop()
        Actions.mePublished()
      })
      // dispatch(analytics.actions.submitComposition())
      Keyboard.dismiss()
    },
    beginComposition: () => dispatch(analytics.actions.beginComposition())
  }
}

class Compose extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      submitting: false,
      touched: false
    }
  }
  handleFirstKeystroke (text) {
    if (!this.state.touched) {
      this.setState({ touched: true })
    }
  }
  handleEdit (text) {
    this.handleFirstKeystroke()
    this.setState({ text })
  }
  handleSubmit () {
    const payload = { prompt_id: this.props.prompt.id, body: this.state.text }
    this.props.submitComposition(payload)
  }
  render () {
    const { prompt } = this.props
    const title = prompt ? prompt.prompt : ''
    return (
      <View style={{ flex: 1 }}>
        <components.compose.Header
          style={{ flex: 1 }}
          title={title}
          handleSubmit={() => this.handleSubmit()}
          submitting={this.props.submitting}
          reachedTargetDuration={this.props.reachedTargetDuration}
        />
        <components.compose.Input
          style={{ flex: 1 }}
          handleEdit={(text) => this.handleEdit(text)}
          text={this.state.text}
        />
      </View>
    )
  }
}

const ComposeContainer = connectRequest(queries.fetchPrompts)(Compose)

const ConnectedComposeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComposeContainer)

export default ConnectedComposeContainer

const styles = StyleSheet.create({
  editor: {
    height: 40, borderColor: 'gray', borderWidth: 1
  }
})
