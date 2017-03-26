import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import components from '../components'
import { selectors, queries } from 'common'

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
  truncate (string) {
    return string.substring(0, 100) + ' ...'
  }
  render () {
    const { compositions } = this.props
    return (
      <View style={{ flex: 1 }}>
        {/** <View style={{ flex: 1, marginTop: 40 }}>**/}
        <components.CompositionList
          compositions={compositions}
          renderTitle={composition => composition.prompt.prompt + ' at ' + composition.created_at}
        />
      </View>
    )
  }
}
