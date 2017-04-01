import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Divider } from 'react-native-elements'
import styles from '../styles'

const Banner = (props) => (
  <View>
    <View style={{ marginHorizontal: 30, marginTop: 12 }}>
      <TouchableOpacity onPress={() => Actions.writingSchedule() } style={styles.buttons.bannerTouchableOpacity}>
        <View style={styles.buttons.bannerView}>
          <Text style={styles.buttons.bannerText}>
            Setup Writing Schedule
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    <View style={{ marginTop: 12 }}>
      <Divider/>
    </View>
  </View>
)

export default Banner
