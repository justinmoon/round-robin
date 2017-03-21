import React from 'react'
import { Provider } from 'react-redux'

import { Routes } from './containers'
import store from './store'

import Raven from 'raven-js'

// TODO: not in dev
Raven
  .config('https://86a202937e364a4387056354e1a2284b@sentry.io/150079')
  .install()

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}

export default App
