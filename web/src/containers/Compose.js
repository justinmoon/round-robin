import React from 'react'
import {Editor, EditorState} from 'draft-js'

class Compose extends React.Component {
  constructor (props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()}
    this.onChange = (editorState) => this.setState({editorState})
  }
  render () {
    return (
      <div style={{
        fontFamily: "'Source Sans Pro', sans-serif",
        backgroundColor: '#eff2f1'
      }}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default Compose
