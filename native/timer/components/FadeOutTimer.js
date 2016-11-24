import React, { Component } from 'react'
import { View, Text, Animated } from 'react-native'
import FadeOutView from './FadeOutView'
import { formattedTimeRemainingSelector } from '../selectors'


class Timer extends Component {
  componentWillMount() {
    this.interval = setInterval(() => {
      // FIXME
      this.forceUpdate()
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    const formattedTimeRemaining = formattedTimeRemainingSelector(this.props)
    return (
      <Text>{formattedTimeRemaining}</Text>
    )
  }
}

export default class FadeOutTimer extends Component {
  render() {
    return (
      <FadeOutView>
        <Timer {...this.props} />
      </FadeOutView>
    )
  }
}
