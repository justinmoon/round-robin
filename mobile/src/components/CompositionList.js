import React from 'react'
import { View, Image, ListView, StyleSheet, Text } from 'react-native'

import { ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 20
  }
})

const truncate = string => string.substring(0, 100) + ' ...'

const Row = ({ composition, renderTitle }, i) => (
  <ListItem
    hideChevron
    onPress={() => Actions.composition({ compositionId: composition.id })}
    avatar={{ uri: composition.author.avatar_url }}
    key={i}
    title={renderTitle(composition)}
    subtitle={truncate(composition.body)}
  />
)

class CompositionList extends React.Component {
  constructor (props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(props.compositions)
    }
  }
  componentWillReceiveProps (nextProps) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    if (nextProps.compositions != this.props.compositions) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.compositions)
      })
    }
  }
  render () {
    return (
      <ListView
        enableEmptySections
        style={styles.listContainer}
        dataSource={this.state.dataSource}
        renderRow={composition => <Row composition={composition} renderTitle={this.props.renderTitle} />}
      />
    )
  }
}

export default CompositionList
