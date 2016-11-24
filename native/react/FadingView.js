// FIXME: disaster

import React, { Component } from 'react'
import { View, Text, Animated } from 'react-native'

export default class FadingView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(1),
    }
  }
  fadeIn() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1, duration: 3000, }
    ).start()
  }
  fadeOut() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 0, duration: 3000, delay: 3000 }
    ).start()
  }
  componentDidMount() {
    this.fadeOut()
  }
  componentWillReceiveProps(props) {
    if (this.props.finalOpacity < props.finalOpacity) {
      this.fadeIn()
    }
  }
  render() {
    return (
      <Animated.View style={{opacity: this.state.fadeAnim}}>
        {this.props.children}
      </Animated.View>
    )
  }
}
