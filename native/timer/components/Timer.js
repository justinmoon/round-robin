import React, { Component } from 'react'
import { View, Text, Animated } from 'react-native'
import { formattedTimeRemainingSelector } from '../selectors'

export default class Timer extends Component {
  componentWillMount() {
    this.interval = setInterval(() => {
      // FIXME
      this.forceUpdate()
      this.props.tick()
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    const formattedTimeRemaining = formattedTimeRemainingSelector(this.props)
    return (
      <Text style={{ textAlign: 'right'}}>{formattedTimeRemaining}</Text>
    )
  }
}
