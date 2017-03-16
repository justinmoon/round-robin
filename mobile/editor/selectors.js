import moment from 'moment'

export function getPrompt(state) {
  const utcDate = new Date()
  momentDate = moment(+moment.utc(utcDate))
  const key = momentDate.format('YYYY-MM-DD')
  return state.prompts.prompts[key]
}
