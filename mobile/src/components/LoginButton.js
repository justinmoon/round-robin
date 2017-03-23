import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  view: {
    height: 44,
  }
})

// some fun gradient experiments ...

/* start={[0, 0]}
 * locations={[0,0.5,1]}
 * end={[1, 0]}
 * */


      // <LinearGradient
          // colors={['#4c669f', '#3b5998', '#192f6a']}
          // style={styles.linearGradient}>
        // <Text style={styles.buttonText}>
          // Login with Facebook
        // </Text>
      // </LinearGradient>

export default ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.view}>
      <LinearGradient
          colors={['black', 'black', 'black']}
          style={styles.linearGradient}>
        <Text style={styles.buttonText}>
          Login with Facebook
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}
