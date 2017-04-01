import React from 'react'
import { DatePickerIOS, TimePickerAndroid, Platform, View, Text } from 'react-native'
import styles from '../styles'
import { List, ListItem } from 'react-native-elements'
import { selectors, queries } from 'common'
import { connect } from 'react-redux'
import moment from 'moment'

const mapStateToProps = (state) => {
  return {
    currentUser: selectors.getCurrentUser(state), state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateWritingSchedule: reminder_time => dispatch(queries.updateUser({ reminder_time }))
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class WritingSchedule extends React.Component {
  constructor(props) {
    super(props)
    const parsedReminderTime = props.currentUser.reminder_time.split(':')
    const date = new Date()
    date.setHours(Number(parsedReminderTime[0]))
    date.setMinutes(Number(parsedReminderTime[1]))
    date.setSeconds(Number(0))
    this.state = {open: false, date }
  }
  onDateChange(date) {
    this.setState({date})
    const formatted = moment(date).format('HH:mm:ss')
    this.props.updateWritingSchedule(formatted)
  }
  renderIOS() {
    return <DatePickerIOS
      date={this.state.date}
      mode="time"
      onDateChange={::this.onDateChange}
      minuteInterval={10}
    />
  }
  async openAndroid () {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: this.state.date.getHours(),
        minute: this.state.date.getMinutes(),
        is24Hour: false
      })
      if (action !== TimePickerAndroid.dismissedAction) {
        let date = new Date(this.state.date.getTime())
        date.setHours(hour)
        date.setMinutes(minute)
        this.setState({ date })
        const formatted = moment(date).format('HH:mm:ss')
        this.props.updateWritingSchedule(formatted)
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }
  openIOS() {
    this.setState({ open: !this.state.open })
  }
  render () {
    const display = moment(this.state.date).format('hh:mm A')
    return (
      <View style={[styles.general.scene, { marginTop: 5 }]}>
          <Text style={{ textAlign: 'center' }}>Choose a time to write every day, and we will send a notification at that time to remind you</Text>
        <List>
          <ListItem
            onPress={() => Platform.OS === 'ios' ? this.openIOS() : this.openAndroid()}
            title='Time'
            rightTitle={display}
          />
          {this.state.open && this.renderIOS()}
        </List>
      </View>
    )
  }
}
