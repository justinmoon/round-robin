import React from 'react'
import { Compose, Friends, Me } from './containers'
import { Nav } from './components'
import { Grid, Row, Col } from 'react-flexbox-grid'

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
        return <Compose />
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
      <Grid fluid>
        <Nav updateRoute={route => this.onUpdateRoute(route)} />
        {this.getCurrentRoute()}
      </Grid>
    )
  }
}

export default App
