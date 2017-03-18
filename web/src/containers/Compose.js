import React from 'react'
import {Editor, EditorState} from 'draft-js'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import { selectors, queries } from 'common'

const mapStateToProps = (state, ownProps) => {
  return {
    prompt: selectors.getPrompt(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitComposition: (payload) => {
      dispatch(queries.submitComposition(payload))
      ownProps.updateRoute('me')
    }
  }
}

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

const ComposeContainer = connectRequest(queries.fetchPrompts)(Compose)

export default connect(mapStateToProps, mapDispatchToProps)(ComposeContainer)
