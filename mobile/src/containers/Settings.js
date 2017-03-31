import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import components from '../components'
import { selectors, queries } from 'common'
import styles from '../styles'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

@connect(mapStateToProps, mapDispatchToProps)
// @connectRequest(queries.fetchCurrentUserCompositions)
export default class Settings extends React.Component {
  render () {
    return (
      <View style={styles.general.scene}>
        <Text style={{fontSize: 60}}>Settings</Text>
      </View>
    )
  }
}
