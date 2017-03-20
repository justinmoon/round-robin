import React from 'react'
import { Provider } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { ConnectedRouter } from 'react-router-redux'
import { Route, NavLink, Link } from 'react-router-dom'

import { Compose, Friends, Me } from './containers'
import { Nav, FBLogin } from './components'
import store from './store'
import history from './history'

console.log(Compose)

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <ul>
              <li><NavLink to="/friends">Friends</NavLink></li>
              <li><NavLink to="/write">Write</NavLink></li>
              <li><NavLink to="/me">Me</NavLink></li>
            </ul>
            <Route path="/friends" component={Friends} />
            <Route path="/write" component={Compose} />
            <Route path="/me" component={Me} />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
