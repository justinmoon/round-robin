import React from 'react'
import { ScrollView, View, Text, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import { Actions } from 'react-native-router-flux'
import { List, ListItem } from 'react-native-elements'

import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import styles from '../styles'
import config from '../config'

import analytics from '../analytics'
import community from '../community'
import components from '../components'
import { compositionsByFriends } from '../selectors/index.js'
import { queries } from 'common'
import lodash from 'lodash'


const mapStateToProps = (state) => {
  const isByFriend = composition => composition.author.id !== state.currentUser.id
  return {
    compositions: compositionsByFriends(state),
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

const FriendsContainer = connectRequest(queries.fetchFriendsCompositions)(Friends)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendsContainer)
