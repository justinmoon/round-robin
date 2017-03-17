import React from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import components from '../components'
import { selectors, queries } from 'common'

const mapStateToProps = (state, ownProps) => {
  return {
    compositions: selectors.currentUserPublishedCompositions(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

class Published extends React.Component {
  truncate(string) {
    return string.substring(0, 100) + ' ...'
  }
  render() {
    const { compositions } = this.props
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <components.CompositionList 
          compositions={compositions}
          renderTitle={composition => composition.prompt.prompt + ' at ' + composition.created_at}
        />
      </View>
    )
  }
}

const PublishedContainer = connectRequest(queries.fetchCurrentUserCompositions)(Published)

const ConnectedPublished = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublishedContainer)

export default ConnectedPublished
