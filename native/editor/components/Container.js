import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

import SplashScreen from 'react-native-splash-screen'

import timer from '../../timer'
import editor from '../index'
import community from '../../community'

const mapStateToProps = (state) => {
  return {
    prompt: editor.selectors.getPrompt(state),
    timer: state.timer,
    reachedTargetDuration: timer.selectors.reachedTargetDurationSelector({ timer: state.timer }),
    countingDown: timer.selectors.countingDown({ timer: state.timer }),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: () => {
      return dispatch(community.actions.fetchCompositions())
    },
    submitComposition: payload => dispatch(editor.actions.submit(payload)).then(Actions.communityExplanation),
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
    SplashScreen.hide()
    this.props.fetch()
    this.props.startTimer()
  }
  componentWillUnmount() {
    this.props.stopTimer()
  }
  handleSubmit() {
    const payload = { prompt_id: this.props.prompt.id, body: this.state.text }
    this.props.submitComposition(payload)
  }
  render() {
    // FIXME
    const title = this.props.prompt && this.props.prompt.prompt
    return (
      <View style={{ flex: 1 }}>
        <editor.components.Header
          style={{ flex: 1 }}
          title={title}
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
