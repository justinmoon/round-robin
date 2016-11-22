import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

import Editor from './Editor.js';
import Header from './Header.js';

import { fetchPrompts } from '../redux/prompts.js'
import { submitCreation } from '../redux/creations.js'

const mapStateToProps = (state) => {
  var shortISODateString = new Date().toISOString().substring(0, 10)
  return {
    prompt: state.prompts.prompts[shortISODateString],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPrompts: () => dispatch(fetchPrompts()),
    submitCreation: (payload) => dispatch(submitCreation(payload)).then(Actions.community),
  }
}

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      submitting: false,
    }
  }
  componentWillMount() {
    this.props.fetchPrompts()
  }
  handleSubmit() {
    const payload = { username: 'Justin', prompt: this.props.prompt, body: this.state.text }
    this.props.submitCreation(payload)
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          style={{ flex: 1 }}
          title={this.props.prompt}
          handleSubmit={() => this.handleSubmit()}
          submitting={this.state.submitting}
        />
        <Editor
          style={{ flex: 1 }}
          handleEdit={(text) => this.setState({text})}
          text={this.state.text}
        />
      </View>
    );
  }
}

const ConnectedEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorContainer)

export default ConnectedEditorContainer

const styles = StyleSheet.create({
  editor: {
    height: 40, borderColor: 'gray', borderWidth: 1,
  },
})
