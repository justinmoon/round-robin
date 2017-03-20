import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { selectors, queries } from 'common'

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: selectors.getCurrentUser(state),
    loggedIn: selectors.loggedIn(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => {
      window.FB.login(function (response) {
        if (response.authResponse) {
          dispatch(queries.login({ access_token: _.get(response, 'authResponse.accessToken') }))
        } else {
          console.log('User cancelled login or did not fully authorize.')
        }
      }, { scope: 'public_profile,user_friends,email' })
    },
    logout: () => {
      dispatch(queries.logout())
    }
  }
}

class FBLogin extends React.Component {
  render () {
    const { loggedIn, login, logout } = this.props
    return loggedIn
      ? <button onClick={logout}>Logout</button>
      : <button onClick={login}>Login with Facebook</button>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FBLogin)
