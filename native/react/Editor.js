import React, { Component } from 'react';
import { Dimensions, Keyboard, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { submitCreation }  from '../firebase.js';

const NAV_HEIGHT = 40;  // FIXME: get correct number and put in canonical constants file

export default class Editor extends Component {
  constructor(props) {
    super(props);
    var {height, width} = Dimensions.get('window');
    this.state = {
      text: 'i\nam\ndog',
      textInputHeight: 200,  // FIXME: wild guess, but iOS is bugging on a render with undefined value here ...
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  input: {
    /* padding: 20,*/
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
    fontFamily: 'System',
    textAlignVertical: 'top',
  },
  scrollView: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
