import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import components from '../components'
import { selectors, queries } from 'common'
import styles from '../styles'

const mapStateToProps = (state, ownProps) => {
  return {
    compositions: selectors.currentUserPublishedCompositions(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

@connect(mapStateToProps, mapDispatchToProps)
@connectRequest(queries.fetchCurrentUserCompositions)
export default class Published extends React.Component {
  render () {
    const { compositions } = this.props
    return (
      <View style={styles.general.scene}>
        <components.Banner />
        <components.CompositionList
          compositions={compositions}
          renderTitle={composition => composition.prompt.prompt + ' - ' + selectors.formatTimestamp(composition.created_at)}
        />
      </View>
    )
  }
}
