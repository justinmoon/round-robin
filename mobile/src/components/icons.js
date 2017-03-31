import React, {
  PropTypes
} from 'react'
import {
  Text, TouchableWithoutFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string
}

const TabIcon = (props) => (
  <Text
    style={{
      fontWeight: 'bold',
      fontSize: 18,
      color: props.selected ? 'black' : '#A9A9A9'
    }}
  >
    {props.title}
  </Text>
)
TabIcon.propTypes = propTypes

class WriteIcon extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: '#a9a9a9'
    }
  }
  darken () {
    this.setState({ color: 'black' })
  }
  lighten () {
    this.setState({ color: '#a9a9a9' })
  }
  render () {
    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.darken()}
        onPressOut={() => this.lighten()}
        onPress={this.props.onPress}
      >
        <Icon name='plus-square' color={this.state.color} size={35} />
      </TouchableWithoutFeedback>
    )
  }
}
export {
  TabIcon,
  WriteIcon,
  // XIcon,
  // CheckIcon,
}
