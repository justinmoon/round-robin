import React from 'react'
import { Row, Col } from 'react-flexbox-grid'

class Nav extends React.Component {
  render () {
    const { updateRoute } = this.props
    return (
      <Row around='xs'>
        <Col xs={2} onClick={() => updateRoute('friends')}>
          FRIENDS
        </Col>
        <Col xs={2} onClick={() => updateRoute('compose')}>
          WRITE
        </Col>
        <Col xs={2} onClick={() => updateRoute('me')}>
          ME
        </Col>
      </Row>
    )
  }
}

export default Nav
