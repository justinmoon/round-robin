import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import Swiper from 'react-native-swiper'
import { List, ListItem } from 'react-native-elements'
import { connectRequest } from 'redux-query'
import { queries } from 'common'

import { connect } from 'react-redux'
import styles from '../styles'

import analytics from '../analytics'
import { selectors } from 'common'

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
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{composition.prompt.prompt}</Text>
      <Text style={{ fontSize: 16 }}> by </Text>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{name}</Text>
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    composition: selectors.getCompositionById(state, ownProps.compositionId),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

class Composition extends React.Component {
  render() {
    const { composition } = this.props
    // FIXME
    if (!composition) {
      return <View><Text>loading</Text></View>
    }
    return (
      <View style={styles.community.container}>
        <Header composition={composition} />
        <ScrollView>
          <Text style={styles.community.content}>{composition.body}</Text>
        </ScrollView>
      </View>
    );
  }
}


const CompositionContainer = connectRequest(queries.fetchFriendsCompositions)(Composition)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompositionContainer)
