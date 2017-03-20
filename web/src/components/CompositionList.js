import React from 'react'
import Composition from './Composition'

class CompositionList extends React.Component {
  render () {
    const { compositions, renderTitle } = this.props
    return (
      <div>
        {compositions.map((c, i) => <Composition
          key={i}
          {...c}
          renderTitle={renderTitle}
        />)}
      </div>
    )
  }
}

export default CompositionList
