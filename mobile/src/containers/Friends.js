import React from 'react'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import components from '../components'
import { selectors, queries } from 'common'

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
  truncate (string) {
    return string.substring(0, 100) + ' ...'
  }
  render () {
    const { compositions } = this.props
    return (
      <components.CompositionList
        compositions={compositions}
        renderTitle={composition => composition.prompt.prompt + ' by ' + composition.author.name}
      />
    )
  }
}
