import React from 'react'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import { selectors, queries } from 'common'

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
      <ul>
        {compositions.map((c, i) => <li key={i}>{c.body}</li>)}
      </ul>
    )
  }
}

const FriendsContainer = connectRequest(queries.fetchFriendsCompositions)(Friends)

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer)
