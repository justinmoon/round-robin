import React from 'react'
import { ScrollView, View, Text, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'

import { connect } from 'react-redux'
import styles from '../../react/styles'

 // FIXME: Duplicate component
const Header = ({ composition }) => {
  const name = composition.author.name.split(' ')[0]
  return (
    <View style={{
      flex: 1,
      height: 20,
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <StatusBar hidden />
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{composition.prompt.prompt}</Text>
      <Text style={{ fontSize: 16 }}> by </Text>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{name}</Text>
    </View>
  );
}


const Composition = ({ composition }) => {
  return (
    <View style={styles.community.page}>
      <Header composition={composition} />
      <ScrollView>
        <Text style={styles.community.content}>{composition.body}</Text>
      </ScrollView>
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
      touchStartedAt: undefined,
    }
  }
  // FIXME: undefined passed in for state and context
  // have to fall back to using refs ...
  onTouchStart (e, state, context) {
    const touchStartedAt = new Date().getTime()
    this.setState({ touchStartedAt })
  }
  onTouchEnd (e, state, context) {
    const now = new Date().getTime()
    const touchDuration = now - this.state.touchStartedAt
    if (touchDuration < 200) {
      // FIXME: this can overshoot ...
      // FIXME: refs are depricated ...
      console.log('next!!!')
      this.refs.swiper.scrollBy(1, true)
    }
    const touchStartedAt = undefined
    this.setState({ touchStartedAt })
  }
  render() {
    const { compositions } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Swiper
          style={{ flex: 1 }}
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
