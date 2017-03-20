import React from 'react'
import { Redirect, BrowserRouter, Route, NavLink } from 'react-router-dom'

import { Compose, Friends, Me } from '../containers'
import { Login, Logout } from '../components'

import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import { selectors, queries } from 'common'

const ProtectedRoute = ({ component, redirect, ...rest }) => (
  <Route {...rest} render={props => {
    return redirect ? (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    ) : (
      React.createElement(component, props)
    )
  }} />
)

const RedirectHomeRoute = ({ component, loggedIn, ...rest }) => (
  <Route {...rest} render={props => {
    console.log(loggedIn)
    return loggedIn ? (
      <Redirect to={{
        pathname: '/me',
        state: { from: props.location }
      }} />
    ) : (
      React.createElement(component, props)
    )
  }} />
)

const mapStateToProps = (state, ownProps) => {
  return {
    redirect: selectors.redirectToLogin(state),
    loggedIn: selectors.loggedIn(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

class Routes extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><NavLink to='/friends'>Friends</NavLink></li>
            <li><NavLink to='/write'>Write</NavLink></li>
            <li><NavLink to='/me'>Me</NavLink></li>
            {this.props.loggedIn && <li><Logout /></li>}
          </ul>
          <ProtectedRoute {...this.props} path='/friends' component={Friends} />
          <ProtectedRoute {...this.props} path='/write' component={Compose} />
          <ProtectedRoute {...this.props} path='/me' component={Me} />
          <RedirectHomeRoute exact {...this.props} path='/login' component={Login} />
        </div>
      </BrowserRouter>
    )
  }
}

const RoutesContainer = connectRequest(queries.fetchCurrentUser)(Routes)
export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer)
