import React from 'react'
import { Text } from 'react-native'
import { Actions } from 'react-native-router-flux'


const Banner = (props) => (
  <Text style={{ fontSize: 40 }} onPress={() => Actions.writingSchedule()}>Setup writing schedule</Text>
)

export default Banner
