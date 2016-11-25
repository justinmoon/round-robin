import React, { Component } from 'react';
import { Dimensions, Keyboard, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { submitCreation }  from '../firebase.js';
import { composition as styles } from './styles';

const NAV_HEIGHT = 40;  // FIXME: get correct number and put in canonical constants file

export default class Editor extends Component {
  constructor(props) {
    super(props);
    var { height } = Dimensions.get('window');
    this.state = {
      textInputHeight: height - NAV_HEIGHT,
      screenHeight: height,
    };
  }
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (frames) => this._keyboardDidShow(frames));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (frames) => this._keyboardDidHide(frames));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow (frames) {
    var keyboardHeight = frames.endCoordinates.height
    var textInputHeight = this.state.screenHeight - NAV_HEIGHT - keyboardHeight;
    this.setState({ textInputHeight });
  }

  _keyboardDidHide (frames) {
    var keyboardHeight = 0;
    var textInputHeight = this.state.screenHeight - NAV_HEIGHT;
    this.setState({ textInputHeight });
  }

  render() {
    return (
      <View style={styles.page}>
        <ScrollView keyboardDismissMode='interactive' style={styles.scrollView} contentContainerStyle={styles.contentContainerStyle}>
          <TextInput
              style={[styles.input, {height: this.state.textInputHeight}]}
              multiline={true}
              autoFocus={true}
              underlineColorAndroid='transparent'
              onChangeText={this.props.handleEdit}
              value={this.props.text}>
          </TextInput>
        </ScrollView>
      </View>
    );
  }
}
