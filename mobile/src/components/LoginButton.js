import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import text from './text'

const inline = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
  view: {
    height: 44
  }
})

      // <LinearGradient
          // colors={['#4c669f', '#3b5998', '#192f6a']}
          // style={styles.linearGradient}>
        // <Text style={styles.buttonText}>
          // Login with Facebook
        // </Text>
      // </LinearGradient>

export default ({onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={inline.view}>
        <LinearGradient
          colors={['black', 'black', 'black']}
          style={inline.linearGradient}>
          <Text style={inline.buttonText}>
            Login with Facebook
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <text.Disclaimer style={{ marginTop: 5, textAlign: 'center' }}>
        We don't post anything to Facebook
      </text.Disclaimer>
    </View>
  )
}
