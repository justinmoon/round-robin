import React, { Component } from 'react'
import { View, Text, Animated } from 'react-native'

// TODO: Put this in generic location
class FadeOutView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(1),
    }
  }
  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1 }
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
