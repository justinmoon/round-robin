import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import { fetchCompositions } from '../reducers/compositions.js'
import styles from './styles'

const Composition = ({ composition }) => {
  return (
    <View style={styles.community.page}>
      <Header composition={composition} />
      <Text style={styles.community.content}>{composition.body}</Text>
    </View>
  );
}

// FIXME: Duplicate component
const Header = ({ composition }) => {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    }}>
      <StatusBar hidden={true} />
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{composition.prompt}</Text>
      {/* <Text style={{ fontSize: 16 }}> by </Text> */}
      {/* <Text style={{ fontSize: 16, fontWeight: '500' }}>{composition.username}</Text> */}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    compositions: state.compositions.compositions,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCompositions: () => {
      dispatch(fetchCompositions())
    }
  }
}

const Community = ({ compositions }) => {
    return (
      <View>
        <Swiper showsPagination={false}>
          {compositions.map((composition) =>
            <Composition key={composition.id} composition={composition}/>
          )}
        </Swiper>
      </View>
    )
}

const ConnectedCommunity = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Community)

export default ConnectedCommunity
