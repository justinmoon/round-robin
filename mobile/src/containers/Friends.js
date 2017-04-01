import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import components from '../components'
import { selectors, queries } from 'common'
import styles from '../styles'

const mapStateToProps = (state) => {
  return {
    compositions: selectors.compositionsByFriends(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

@connect(mapStateToProps, mapDispatchToProps)
@connectRequest(queries.fetchFriendsCompositions)
export default class Friends extends React.Component {
  render () {
    const { compositions } = this.props
    return (
      <View style={styles.general.scene}>
        <components.CompositionList
          compositions={compositions}
          renderTitle={composition => composition.prompt.prompt + ' by ' + composition.author.name}
        />
      </View>
    )
  }
}
