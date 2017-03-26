import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { default as s } from '../styles'

var styles = StyleSheet.create({

})

const Disclaimer = ({ style, text }) => (
  <Text style={[s.text.tiny, style]}>
    {text}
  </Text>
)

export default {
  Disclaimer,
}
