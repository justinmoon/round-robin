import moment from 'moment'
import { get, has } from 'lodash'
import { querySelectors } from 'redux-query'


/**
 * Authentication
 */
export const getCurrentUser = state => {
  return get(state, 'entities.currentUser')
}

export const loggedIn = state => {
  return has(state, 'entities.currentUser.id')
}

export const isFetchingCurrentUser = state => {
  const url = '/current-user-json'
  return querySelectors.isPending(url)(state.queries) || false
}

export const isLoggingIn = state => {
  const url = '/login'
  // FIXME: doesn't seem to work
  return querySelectors.isPending(url)(state.queries) || false
}


// FIXME: RENAME!!!
export const redirectToLogin = state => {
  return getCurrentUser(state) !== undefined && !loggedIn(state)
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
