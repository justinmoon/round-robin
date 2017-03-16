import React from 'react'
import { ScrollView, View, Text, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux'
import { List, ListItem } from 'react-native-elements'

import { connect } from 'react-redux'
import styles from '../styles'

import analytics from '../analytics'
import community from '../community'
import components from '../components'


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
      <components.CompositionList 
        compositions={compositions}
        renderTitle={composition => composition.prompt.prompt + ' by ' + composition.author.name}
      />
    )
  }
}

const ConnectedFriends = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Friends)

export default ConnectedFriends
