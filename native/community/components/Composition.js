import React from 'react'
import { ScrollView, View, Text, StatusBar } from 'react-native'
import Swiper from 'react-native-swiper'
import { List, ListItem } from 'react-native-elements'

import { connect } from 'react-redux'
import styles from '../../styles'

import analytics from '../../analytics'
import community from '../../community'
import editor from '../../editor'

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

const mapStateToProps = (state, ownProps) => {
  // FIXME: UGLY!
  return {
    composition: state.compositions.compositions.filter(c => String(c.id) === String(ownProps.compositionId))[0],
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchFeed: () => dispatch(community.actions.fetchCompositions()),
  }
}

class Composition extends React.Component {
  componentWillMount() {
    this.props.fetchFeed()
  }
  render() {
    const { composition } = this.props
    // FIXME
    if (!composition) {
      return <View/>
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

const ConnectedComposition = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Composition)

export default ConnectedComposition
