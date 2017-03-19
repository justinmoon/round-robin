import React from 'react'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import { selectors, queries } from 'common'
import { CompositionList } from '../components'

const mapStateToProps = (state, ownProps) => {
  return {
    compositions: selectors.compositionsByFriends(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

class Friends extends React.Component {
  render () {
    const { compositions } = this.props
    return (
      <CompositionList 
        compositions={compositions} 
        renderTitle={composition => composition.prompt.prompt + ' by ' + composition.author.name}
      />
    )
  }
}

const FriendsContainer = connectRequest(queries.fetchFriendsCompositions)(Friends)

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer)
