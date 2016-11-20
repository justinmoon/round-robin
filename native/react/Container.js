import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Editor from './Editor.js';
import Header from './Header.js';
import Scroll from './Scroll.js';

import { submitCreation }  from '../firebase.js';

export default class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: 'Monkey Brains',
      text: '',
    }
  }
  handleSubmit() {
    submitCreation('Justin', this.state.prompt, this.state.text);
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
