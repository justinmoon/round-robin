import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text } from 'react-native';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'i\nam\ndog',
      height: undefined,
    };
  }
  handleLayout(ev) {
  }
  render() {
    return (
      <View style={styles.page} onLayout={(ev) => {
        // 80 is for the navbar on top
        const height = ev.nativeEvent.layout.height - 80;
        this.setState({ height });
        }}>
        <ScrollView keyboardDismissMode='interactive' style={styles.scrollView} contentContainerStyle={styles.contentContainerStyle}>
        <TextInput
            style={[styles.input, {height:this.state.height}]}
            multiline={true}
            autoFocus={true}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}>
        </TextInput>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    /* alignItems: 'stretch',*/
  },
  input: {
    /* padding: 20,*/
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
    fontFamily: 'System',
  },
  scrollView: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
  },
});
