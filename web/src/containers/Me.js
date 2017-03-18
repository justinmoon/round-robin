import React from 'react'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import { selectors, queries } from 'common'

const mapStateToProps = (state, ownProps) => {
  return {
    compositions: selectors.currentUserPublishedCompositions(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

class Me extends React.Component {
  render () {
    return <div>Me</div>
  }
}

const MeContainer = connectRequest(queries.fetchCurrentUserCompositions)(Me)

export default connect(mapStateToProps, mapDispatchToProps)(MeContainer)
