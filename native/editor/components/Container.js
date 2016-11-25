import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

import timer from '../../timer'
import editor from '../index'

// TODO: move this to editor module
import { submitComposition } from '../../reducers/compositions.js'

const mapStateToProps = (state) => {
  var shortISODateString = new Date().toISOString().substring(0, 10)
  return {
    prompt: state.prompts.prompts[shortISODateString],
    timer: state.timer,
    reachedTargetDuration: timer.selectors.reachedTargetDurationSelector({timer: state.timer}),
    countingDown: timer.selectors.countingDown({ timer: state.timer }),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitComposition: (payload) => dispatch(editor.actions.submit(payload)).then(Actions.community),
    setTargetDuration: duration => dispatch(timer.actions.setTargetDuration(duration)),
    startTimer: () => dispatch(timer.actions.start()),
    stopTimer: () => dispatch(timer.actions.stop()),
    tick: () => dispatch(timer.actions.tick()),
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
    this.props.startTimer()
  }
  componentWillUnmount() {
    this.props.stopTimer()
  }
  handleSubmit() {
    const payload = { username: 'Justin', prompt: this.props.prompt, body: this.state.text }
    this.props.submitComposition(payload)
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <editor.components.Header
          style={{ flex: 1 }}
          title={this.props.prompt}
          handleSubmit={() => this.handleSubmit()}
          submitting={this.state.submitting}
          timer={this.props.timer}
          tick={this.props.tick}
          countingDown={this.props.countingDown}
          reachedTargetDuration={this.props.reachedTargetDuration}
        />
        <editor.components.Editor
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
