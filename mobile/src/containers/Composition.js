import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { connectRequest } from 'redux-query'
import { queries, selectors } from 'common'
import components from '../components'

import { connect } from 'react-redux'
import styles from '../styles'

const Header = ({ composition }) => {
  const name = composition.author.name.split(' ')[0]
  return (
    <View style={{
      height: 20,
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{composition.prompt.prompt}</Text>
      <Text style={{ fontSize: 16 }}> by </Text>
      <Text style={{ fontSize: 16, fontWeight: '500' }}>{name}</Text>
    </View>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    composition: selectors.getCompositionById(state, ownProps.compositionId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@connectRequest(queries.fetchFriendsCompositions)
export default class Composition extends React.Component {
  render () {
    const { composition } = this.props
    // FIXME
    if (!composition) {
      return <View><Text>loading</Text></View>
    }
    const name = composition.author.name.split(' ')[0]
    const title = (
      <View style={styles.general.row}>
        <Text style={styles.text.title}>{composition.prompt.prompt}</Text>
        <Text style={styles.text.titleSmall}> by </Text>
        <Text style={styles.text.title}>{name}</Text>
      </View>
    )
    return (
      <View style={styles.community.container}>
        <components.compose.Header title={title} />
        <ScrollView>
          <Text style={styles.community.content}>{composition.body}</Text>
        </ScrollView>
      </View>
    )
  }
}
