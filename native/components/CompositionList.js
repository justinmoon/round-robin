import React from 'react';
import { View, Image, ListView, StyleSheet, Text } from 'react-native';

import { ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'


const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
});

const truncate = string => string.substring(0, 100) + ' ...'

const Row = ( composition, i ) => (
  <ListItem
    hideChevron
    onPress={() => Actions.composition({ compositionId: composition.id })}
    avatar={{ uri: composition.author.avatar_url }}
    key={i}
    title={composition.prompt.prompt + ' by ' + composition.author.name}
    subtitle={truncate(composition.body)}
  />
)

class CompositionList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      console.log(props.compositions),
    this.state = {
      dataSource: ds.cloneWithRows(props.compositions),
    };
  }
  componentWillReceiveProps(nextProps) {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if (nextProps.compositions != this.props.compositions) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.compositions),
      })
    }
  }
  render() {
    return (
      <ListView
        enableEmptySections
        style={styles.listContainer}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row {...data} />}
      />
    );
  }
}

export default CompositionList
