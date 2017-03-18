import React from 'react'

class Composition extends React.Component {
  render() {
    const { body, renderTitle } = this.props
    return (
      <div>
        <h1>{renderTitle(this.props)}</h1>
        <div>{body}</div>
      </div>
    )
  }
}

export default Composition
