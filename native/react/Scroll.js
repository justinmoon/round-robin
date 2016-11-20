import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text } from 'react-native';

export default class Scroll extends Component {
  render() {
    const colors = [
      'black', 'green', 'yellow', 'red', 'orange'
    ];
    return (
      <View style={styles.page}>
        <ScrollView keyboardDismissMode='interactive' style={styles.scrollView} contentContainerStyle={styles.contentContainerStyle}>

        {colors.map(color =>{
            <Text style={{ top: 200, height: 100, backgroundColor: color }}>frick</Text>
                   })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editor: {
    height: 40,
    top: 10,
    left: 15,
    right: 15,
  },
  page: {
    flex: 1,
    /* alignItems: 'stretch',*/
  },
  input: {
    top: 50,
    height: 200,
    padding: 20,
    paddingTop: 20,
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
