import React from 'react'
import { View, Text } from 'react-native'


const style = {
  fontSize: 20,
  marginTop: 5,
  fontWeight: 'bold',
}


const Marketing = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={style}>
        Write freely
      </Text>
      <Text style={style}>
        About the prompt
      </Text>
      <Text style={style}>
        For 5 minutes
      </Text>
    </View>
  )
}

export default Marketing
