import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
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
      {/* FIXME: temporary until we add login and identity */}
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
  return {}
}

class Community extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      touchStartedAt: undefined
    }
  }
  // FIXME: undefined passed in for state and context
  // have to fall back to using refs ...
  onTouchStart (e, state, context) {
    const touchStartedAt = new Date().getTime()
    this.setState({ touchStartedAt })
  }
  onTouchEnd (e, state, context) {
    now = new Date().getTime()
    const touchDuration = now - this.state.touchStartedAt
    if (touchDuration < 200) {
      console.log(this.refs.swiper.scrollBy)
      this.refs.swiper.scrollBy(1, true)
    }
    const touchStartedAt = undefined
    this.setState({ touchStartedAt })
  }
  render() {
    const { compositions } = this.props
    return (
      <View>
        <Swiper
          ref='swiper'
          showsPagination={false}
          loop={false}
          onTouchStart={this.onTouchStart.bind(this)}
          onTouchEnd={this.onTouchEnd.bind(this)}
        >
          {compositions.map((composition) =>
            <Composition key={composition.id} composition={composition}/>
          )}
        </Swiper>
      </View>
    )
  }
}

const ConnectedCommunity = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Community)

export default ConnectedCommunity
