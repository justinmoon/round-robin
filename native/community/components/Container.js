import React from 'react'
import { ScrollView, View, Text, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux'
import { List, ListItem } from 'react-native-elements'

import { connect } from 'react-redux'
import styles from '../../react/styles'

import analytics from '../../analytics'
import community from '../../community'

 // FIXME: Duplicate component
const Header = ({ composition }) => {
  const name = composition.author.name.split(' ')[0]
  return (
    <View style={{
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
    <View style={styles.community.container}>
      <Header composition={composition} />
      <ScrollView>
        <Text style={styles.community.content}>{composition.body}</Text>
      </ScrollView>
    </View>
  );
}


const mapStateToProps = (state) => {
  const isByFriend = composition => composition.author.id !== state.currentUser.id
  return {
    compositions: state.compositions.compositions.filter(isByFriend),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchFeed: () => dispatch(community.actions.fetchCompositions()),
  }
}

class Community extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      touchStartedAt: undefined,
    }
  }
  componentWillMount() {
    this.props.fetchFeed()
  }
  logScreenView(index) {
    console.log('screen view')
    let properties = {
      index,
      total: this.props.compositions.length,
      composition: this.props.compositions[index],
    }
    // FIXME: would sure be nice if these properties lived in redux ...
    this.props.dispatch(analytics.actions.screen('compositions', properties))
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
    const isTap = touchDuration < 200
    // FIXME: crazy math ... find a better way
    const scenesRemain = this.refs.swiper.props.children.length > this.refs.swiper.state.index + 1
    if (isTap && scenesRemain) {
      // FIXME: refs are depricated ...
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
          ref='swiper'
          showsPagination={false}
          loop={false}
          onTouchStart={this.onTouchStart.bind(this)}
          onTouchEnd={this.onTouchEnd.bind(this)}
          onUpdateIndex={this.logScreenView.bind(this)}
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



class Friends extends React.Component {
  componentWillMount() {
    this.props.fetchFeed()
  }
  truncate(string) {
    return string.substring(0, 100) + ' ...'
  }
  render() {
    const { compositions } = this.props
    return (
      <List containerStyle={{marginBottom: 20}}>
        {
          compositions.map((c, i) => (
            <ListItem
              hideChevron
              onPress={() => Actions.composition({ compositionId: c.id })}
              avatar={{ uri: c.author.avatar_url }}
              key={i}
              title={c.prompt.prompt + ' by ' + c.author.name}
              subtitle={this.truncate(c.body)}
            />
          ))
        }
      </List> 
    )
  }
}

const ConnectedFriends = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Friends)

export default ConnectedFriends
