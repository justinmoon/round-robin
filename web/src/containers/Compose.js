import React from 'react'
import {Editor, EditorState} from 'draft-js'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import { convertToRaw } from 'draft-js'
import { selectors, queries } from 'common'

const mapStateToProps = (state, ownProps) => {
  return {
    prompt: selectors.getPrompt(state),
    state: state,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submit: (payload) => {
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
  onSubmit(e) {
    const contentState = this.state.editorState.getCurrentContent()
    const editorState = convertToRaw(contentState)
    const plainText = contentState.getPlainText()
    const promptId = this.props.prompt.id
    return this.props.submit({
      prompt_id: promptId,
      body: plainText,
    })
  }
  render () {
    const { submit, prompt } = this.props
    return (
      <div>
        <h1>{prompt && prompt.prompt}</h1>
        <div style={{
          fontFamily: "'Source Sans Pro', sans-serif",
            backgroundColor: '#eff2f1'
        }}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
        <button onClick={e=>this.onSubmit(e)}>
          Submit
        </button>
      </div>
    )
  }
}

const ComposeContainer = connectRequest(queries.fetchPrompts)(Compose)

export default connect(mapStateToProps, mapDispatchToProps)(ComposeContainer)
