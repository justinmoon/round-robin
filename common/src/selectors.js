import moment from 'moment'
import { get, has } from 'lodash'

/**
 * Authentication
 */
export const getCurrentUser = state => {
  return get(state, 'entities.currentUser')
}

export const loggedIn = state => {
  return has(state, 'entities.currentUser.id')
}

/**
 * Compositions
 */
export const compositionsByFriends = state => {
  const friendIds = get(state, 'entities.compositions.friendIds', [])
  const compositions = get(state, 'entities.compositions', {})
  return friendIds.map(id => compositions[id])
}

export const currentUserPublishedCompositions = state => {
  const myIds = get(state, 'entities.compositions.myIds', [])
  const compositions = get(state, 'entities.compositions', {})
  return myIds.map(id => compositions[id])
}

export const getCompositionById = (state, compositionId) => {
  return get(state, `entities.compositions.${compositionId}`)
}


/**
 * Prompts
 */
export function getPrompt(state) {
  const utcDate = new Date()
  momentDate = moment(+moment.utc(utcDate))
  const key = momentDate.format('YYYY-MM-DD')
  return get(state, `entities.prompts.${key}`, null)
}

export default {
  compositionsByFriends, 
  currentUserPublishedCompositions, 
  getCompositionById,
  getPrompt,
}
