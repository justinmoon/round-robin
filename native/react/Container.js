import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Editor from './Editor.js';
import Header from './Header.js';

import { submitCreation, getPrompt }  from '../firebase.js';
import { Actions } from 'react-native-router-flux';


export default class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: '',
      text: '',
    }
  }
  componentWillMount() {
    var callback = prompt => {
      this.setState({ prompt });
    }
    getPrompt(callback.bind(this));
  }
  handleSubmit() {
    submitCreation('Justin', this.state.prompt, this.state.text);
    Actions.community();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          style={{ flex: 1 }}
          title={this.state.prompt}
          handleSubmit={() => this.handleSubmit()}
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

const styles = StyleSheet.create({
  editor: {
    height: 40, borderColor: 'gray', borderWidth: 1,
  },
});
