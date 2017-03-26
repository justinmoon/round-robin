import React, { Component } from 'react'
import { Dimensions, Keyboard, View, TextInput, ScrollView } from 'react-native'
import styles from '../../styles'
import constants from '../../constants'

export default class Editor extends Component {
  constructor (props) {
    super(props)
    var { height } = Dimensions.get('window')
    this.state = {
      textInputHeight: height - constants.NAV_HEIGHT,
      screenHeight: height
    }
  }
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (frames) => this._keyboardDidShow(frames))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (frames) => this._keyboardDidHide(frames))
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow (frames) {
    var keyboardHeight = frames.endCoordinates.height
    var textInputHeight = this.state.screenHeight - constants.NAV_HEIGHT - keyboardHeight
    this.setState({ textInputHeight })
  }

  _keyboardDidHide (frames) {
    var textInputHeight = this.state.screenHeight - constants.NAV_HEIGHT
    this.setState({ textInputHeight })
  }

  render () {
    return (
      <View style={styles.editor.page}>
        <ScrollView keyboardDismissMode='interactive' style={styles.editor.scrollView} contentContainerStyle={styles.editor.contentContainerStyle}>
          <TextInput
            style={[styles.editor.input, {height: this.state.textInputHeight}]}
            multiline
            autoFocus
            underlineColorAndroid='transparent'
            onChangeText={this.props.handleEdit}
            value={this.props.text} />
        </ScrollView>
      </View>
    )
  }
}
