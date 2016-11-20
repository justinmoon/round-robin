import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Editor from './Editor.js';
import Header from './Header.js';
import Scroll from './Scroll.js';

export default class EditorContainer extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header style={{ flex: 1 }}/>
        <Editor style={{ flex: 1 }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editor: {
    height: 40, borderColor: 'gray', borderWidth: 1,
  },
});
