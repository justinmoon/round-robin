import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { default as s } from '../styles'

var styles = StyleSheet.create({
  base: {
    // fontFamily: 'SourceSansPro',
  }
})

const BaseText = ({ style, children, ...props }) => (
  <Text {...props} style={[styles.base, style]}>
    {children}
  </Text>
)

const Disclaimer = ({ style, children }) => (
  <BaseText style={[s.text.tiny, style]}>{children}</BaseText>
)

export default {
  Disclaimer,
  BaseText
}
