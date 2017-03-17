import moment from 'moment'
import lodash from 'lodash'

/**
 * Compositions
 */
export const compositionsByFriends = state => {
  const friendIds = lodash.get(state, 'entities.compositions.friendIds', [])
  const compositions = lodash.get(state, 'entities.compositions', {})
  return friendIds.map(id => compositions[id])
}

export const currentUserPublishedCompositions = state => {
  const myIds = lodash.get(state, 'entities.compositions.myIds', [])
  const compositions = lodash.get(state, 'entities.compositions', {})
  return myIds.map(id => compositions[id])
}

/**
 * Prompts
 */
export function getPrompt(state) {
  const utcDate = new Date()
  momentDate = moment(+moment.utc(utcDate))
  const key = momentDate.format('YYYY-MM-DD')
  return lodash.get(state, `entities.prompts.${key}`, '')
}
