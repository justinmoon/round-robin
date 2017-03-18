import React from 'react'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import { selectors, queries } from 'common'
import { CompositionList } from '../components'

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
    const { compositions } = this.props
    return (
      <CompositionList 
        compositions={compositions} 
        renderTitle={composition => composition.prompt.prompt + ' at ' + composition.created_at}
      />
    )
  }
}

const MeContainer = connectRequest(queries.fetchCurrentUserCompositions)(Me)

export default connect(mapStateToProps, mapDispatchToProps)(MeContainer)
