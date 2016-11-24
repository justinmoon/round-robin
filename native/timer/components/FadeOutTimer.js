import React, { Component } from 'react'
import { View, Text, Animated } from 'react-native'
import FadeOutView from './FadeOutTimer'
import { formattedTimeRemaining } from '../selectors'

export default class FadeOutTimer extends Component {
  render() {
    return (
        <Text>remaining: {this.props.formattedTimeRemaining}</Text>
    )
  }
}

