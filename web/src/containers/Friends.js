import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

class Friends extends React.Component {
  render () {
    console.log(this.props)
    return <div>Friends</div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
