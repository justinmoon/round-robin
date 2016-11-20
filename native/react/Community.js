import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import Swiper from 'react-native-swiper'
import { fetchCreations } from '../firebase.js';
import { community as styles } from './styles.js';

class Creation extends Component {
  render() {
    return (
      <View style={styles.page}>
        <Header creation={this.props.creation} />
        <Text style={styles.content}>{this.props.creation.body}</Text>
      </View>
    );
  }
}

class Header extends Component {
  render() {
    const { prompt, username } = this.props.creation;
    return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <StatusBar hidden={true} />
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{prompt}</Text>
        <Text style={{ fontSize: 16 }}> by </Text>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{username}</Text>
      </View>
    );
  }
}

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      creations: []
    }
  }
  componentWillMount() {
    var callback = creations => this.setState({ creations });
    fetchCreations(callback)
  }
  render () {
    return (
      <Swiper showsPagination={false}>
        {this.state.creations.map((creation, key) => <Creation creation={creation} key={key} />)}
      </Swiper>
    )
  }
}
