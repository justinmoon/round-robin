import React from 'react'
import {
  Text,
  View,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
import styles from '../styles'

const { height } = Dimensions.get('window')

export default () => <Swiper
  height={height * (4 / 5) - 10}
  activeDotColor='black'
  loop={false}
>
  <View style={styles.swiper.slide}>
    <Text style={styles.swiper.text}>
      Every day we send you a prompt. You have until midnight to submit a 5 minute composition on the topic.
    </Text>
  </View>
  <View style={styles.swiper.slide}>
    <Text style={styles.swiper.text}>
      Let your creativity flow and have fun with it!
    </Text>
  </View>
  <View style={styles.swiper.slide}>
    <Text style={styles.swiper.text}>
      After you finish, you can explore what users have been writing.
    </Text>
  </View>
</Swiper>
