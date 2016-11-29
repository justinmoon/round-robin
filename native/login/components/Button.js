import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

export default ({onPress}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        color="#841584"
        accessibilityLabel="Login with Facebook"
      >
        <Text>
        Login with Facebook
        </Text>
      </TouchableOpacity>
    </View>
  )
}
