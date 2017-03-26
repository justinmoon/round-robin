// FIXME: disaster

import React, { Component } from 'react'
import { Animated } from 'react-native'

export default class FadingView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(1)
    }
  }
  fadeIn () {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1, duration: 3000 }
    ).start()
  }
  fadeOut () {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 0, duration: 3000, delay: 3000 }
    ).start()
  }
  componentWillReceiveProps (props) {
    if (props.fade === 'in' && this.props.fade !== 'in') {
      this.fadeIn()
    } else if (props.fade === 'out' && this.props.fade !== 'out') {
      this.fadeOut()
    }
  }
  render () {
    return (
      <Animated.View style={{opacity: this.state.fadeAnim}}>
        {this.props.children}
      </Animated.View>
    )
  }
}
