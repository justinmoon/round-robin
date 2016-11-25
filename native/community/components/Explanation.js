import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import dismissKeyboard from 'react-native-dismiss-keyboard'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    achknowledge: () => {
      dispatch(Actions.community)
    }
  }
}

const style = {
  fontSize: 20,
  marginTop: 5,
  fontWeight: 'bold',
}

const Explanation = ({ achknowledge }) => {
  dismissKeyboard()  // android
  return (
    <TouchableWithoutFeedback onPress={achknowledge}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[style], { fontSize: 80, marginBottom: 20 }}>🎉</Text>
          <Text style={style}>
            Tap to see
          </Text>
          <Text style={style}>
            What other people wrote ...
        </Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const ConnectedExplanation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Explanation)

export default ConnectedExplanation
