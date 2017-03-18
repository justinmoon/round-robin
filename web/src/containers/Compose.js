import React from 'react'
import {Editor, EditorState} from 'draft-js'
import styled from 'styled-components'

const EditorContainer = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  background-color: #eff2f7;
`

class Compose extends React.Component {
  constructor (props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()}
    this.onChange = (editorState) => this.setState({editorState})
  }
  render () {
    return (
      <EditorContainer>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
      </EditorContainer>
    )
  }
}

export default Compose
