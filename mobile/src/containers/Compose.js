import React, { Component } from 'react'
import { Text, ActivityIndicator, TouchableOpacity, View, Keyboard } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { graphql } from 'react-apollo';
import moment from 'moment'

import analytics from '../analytics'

import { apollo, queries } from 'common'
import components from '../components'
import styles from '../styles'

@graphql(apollo.fetchPrompt, {
  options: { variables: { date: moment().format('YYYY-MM-DD') } },
  props: ({ data, ownProps }) => ({
    promptId: data.prompt && data.prompt.id,
    title: data.prompt ? data.prompt.prompt : '',
    submitComposition: (payload) => {
      ownProps.dispatch(queries.submitComposition(payload)).then(() => {
        // FIXME: HACK!
        Actions.pop()
        Actions.me()  // for some reason, mePublished doesn't work ...
      })
      Keyboard.dismiss()
    },
  })
})
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
    const payload = { prompt_id: this.props.promptId, body: this.state.text }
    this.setState({ submitting: true })
    this.props.submitComposition(payload)
  }
  render () {
    const { title } = this.props
    const titleComponent = <Text style={styles.header.title}>{title}</Text>
    return (
      <View style={{ flex: 1 }}>
        <components.compose.Header
          style={{ flex: 1 }}
          title={titleComponent}
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
