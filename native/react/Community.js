import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import { fetchCreations } from '../redux/creations.js'
import styles from './styles'

const Creation = ({ creation }) => {
  return (
    <View style={styles.community.page}>
      <Header creation={creation} />
      <Text style={styles.community.content}>{creation.body}</Text>
    </View>
  );
}

// FIXME: Duplicate component
const Header = ({ creation }) => {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    }}>
      <StatusBar hidden={true} />
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{creation.prompt}</Text>
      <Text style={{ fontSize: 16 }}> by </Text>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{creation.username}</Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    creations: state.creations.creations,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCreations: () => {
      dispatch(fetchCreations())
    }
  }
}

const Community = ({ creations }) => {
    return (
      <View>
        <Swiper showsPagination={false}>
          {creations.map((creation) =>
            <Creation key={creation.id} creation={creation}/>
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
