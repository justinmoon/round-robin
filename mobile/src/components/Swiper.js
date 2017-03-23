import React from 'react'
import {
  Text,
  View,
  Dimensions,
} from 'react-native'
import Swiper from 'react-native-swiper'

const { width, height } = Dimensions.get('window')

const styles = {
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}

export default () => <Swiper 
  height={height*(4/5)-10}
  style={styles.wrapper}
  activeDotColor='black'
  loop={false}
>
  <View style={styles.slide}>
    <Text style={styles.text}>
      Every day we send you a prompt. You have until midnight to submit a 15 minute composition on the topic.
    </Text>
  </View>
  <View style={styles.slide}>
    <Text style={styles.text}>
      Let your creativity flow and have fun with it!
    </Text>
  </View>
  <View style={styles.slide}>
    <Text style={styles.text}>
      After you finish, you can explore what users have been writing.
    </Text>
  </View>
</Swiper>
