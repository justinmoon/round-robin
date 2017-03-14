import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

import SplashScreen from 'react-native-splash-screen'

import timer from '../../timer'
import editor from '../index'
import community from '../../community'
import analytics from '../../analytics'

const mapStateToProps = (state) => {
  return {
    prompt: editor.selectors.getPrompt(state),
    timer: state.timer,
    reachedTargetDuration: timer.selectors.reachedTargetDurationSelector({ timer: state.timer }),
    homestretch: timer.selectors.homestretch({ timer: state.timer }),
    submitting: state.compositions.submitting,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch: () => {
      return dispatch(community.actions.fetchCompositions())
    },
    submitComposition: (payload) => {
      dispatch(editor.actions.submit(payload)).then(Actions.me)
      dispatch(analytics.actions.submitComposition())
    },
    setTargetDuration: duration => dispatch(timer.actions.setTargetDuration(duration)),
    startTimer: () => dispatch(timer.actions.start()),
    stopTimer: () => dispatch(timer.actions.stop()),
    tick: () => dispatch(timer.actions.tick()),
    beginComposition: () => dispatch(analytics.actions.beginComposition()),
  }
}

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      submitting: false,
      touched: false,
      fade: null,
    }
  }
  componentWillMount() {
    this.props.fetch()
  }
  componentWillReceiveProps(props) {
    if (props.homestretch && this.state.fade !== 'in') {
      this.setState({ fade: 'in' })
    }
  }
  componentWillUnmount() {
    this.props.stopTimer()
  }
  handleFirstKeystroke(text) {
    if (!this.state.touched) {
      this.props.startTimer()
      this.props.beginComposition()
      this.setState({ touched: true, fade: 'out' })
    }
  }
  handleEdit(text) {
    this.handleFirstKeystroke()
    this.setState({ text })
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
          submitting={this.props.submitting}
          timer={this.props.timer}
          tick={this.props.tick}
          fade={this.state.fade}
          reachedTargetDuration={this.props.reachedTargetDuration}
        />
        <editor.components.Editor
          style={{ flex: 1 }}
          handleEdit={(text) => this.handleEdit(text)}
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
