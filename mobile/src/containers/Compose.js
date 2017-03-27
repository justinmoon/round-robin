import React, { Component } from 'react'
import { Text, ActivityIndicator, TouchableOpacity, View, Keyboard } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import analytics from '../analytics'

import { selectors, queries } from 'common'
import components from '../components'
import styles from '../styles'

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

@connect(mapStateToProps, mapDispatchToProps)
@connectRequest(queries.fetchPrompts)
export default class Compose extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      submitting: false,
      touched: false
    }
  }
  renderLeftHeader () {
    return (
      <TouchableOpacity onPress={() => { Keyboard.dismiss(); Actions.pop() }} >
        <Text style={styles.header.buttonLeft}>Quit</Text>
      </TouchableOpacity>
    )
  }
  renderRightHeader () {
    if (this.state.submitting) {
      return (
        <ActivityIndicator style={{ width: 60 }} size='small' />
      )
    }
    return (
      <TouchableOpacity onPress={::this.handleSubmit} >
        <Text style={styles.header.buttonRight}>Submit</Text>
      </TouchableOpacity>
    )
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
    const titleText = prompt ? prompt.prompt : ''
    const title = <Text style={styles.header.title}>{titleText}</Text>
    return (
      <View style={{ flex: 1 }}>
        <components.compose.Header
          style={{ flex: 1 }}
          title={title}
          left={::this.renderLeftHeader()}
          right={::this.renderRightHeader()}
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
