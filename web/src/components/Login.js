import React from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { queries } from 'common'
import moment from 'moment-timezone'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: () => {
      window.FB.login(function (response) {
        if (response.authResponse) {
          const timezone = moment.tz.guess()
          dispatch(queries.login({ 
            access_token: get(response, 'authResponse.accessToken'), timezone
          }))
        } else {
          console.log('User cancelled login or did not fully authorize.')
        }
      }, { scope: 'public_profile,user_friends,email' })
    }
  }
}

class Login extends React.Component {
  render () {
    const { login } = this.props
    return <button onClick={login}>Login with Facebook</button>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
