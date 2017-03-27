import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import text from './text'
import styles from '../styles'

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
      <TouchableOpacity onPress={onPress} style={styles.buttons.loginTouchableOpacity}>
        <View style={styles.buttons.loginView}>
          <Text style={styles.buttons.loginText}>
            Login with Facebook
          </Text>
        </View>
      </TouchableOpacity>
      <text.Disclaimer style={{ marginTop: 5, textAlign: 'center' }}>
        We don't post anything to Facebook
      </text.Disclaimer>
    </View>
  )
}
