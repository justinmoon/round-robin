import React from 'react'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import { queries } from 'common'
import { FBLogin } from '../components'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

class Landing extends React.Component {
  render () {
    return (
      <FBLogin />
    )
  }
}

const LandingContainer = connectRequest(queries.fetchCurrentUserCompositions)(Landing)

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)
