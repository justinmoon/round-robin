import React from 'react'
import { Provider } from 'react-redux'
import { Compose, Friends, Me } from './containers'
import { Nav, FBLogin } from './components'
import { Grid, Row, Col } from 'react-flexbox-grid'
import store from './store'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      route: ''
    }
  }
  onUpdateRoute (route) {
    this.setState({ route })
  }
  getCurrentRoute () {
    switch (this.state.route) {
      case 'compose':
        return <Compose updateRoute={() => this.onUpdateRoute()} />
      case 'me':
        return <Me />
      case 'friends':
        return <Friends />
      default:
        return (
          <Row>
            <Col xs={6} md={3}>
              Hello, world!
            </Col>
          </Row>
        )
    }
  }
  render () {
    return (
      <Provider store={store}>
        <Grid fluid>
          <FBLogin />
          <Nav updateRoute={route => this.onUpdateRoute(route)} />
          {this.getCurrentRoute()}
        </Grid>
      </Provider>
    )
  }
}

export default App
