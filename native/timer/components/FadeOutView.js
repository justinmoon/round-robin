import React, { Component } from 'react'
import { View, Text, Animated } from 'react-native'

// TODO: Put this in generic location
export default class FadeOutView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(1),
    }
  }
  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 0, duration: 3000, delay: 6000 }
    ).start()
  }
  render() {
    return (
      <Animated.View style={{opacity: this.state.fadeAnim}}>
        {this.props.children}
      </Animated.View>
    )
  }
}
