import config from '../../../src/config'  // FIXME: how to inject config into a node module?
import { mutateAsync } from 'redux-query';


/** 
 * Helpers
 */
const defaultUpdate = (prev, next) => ({ ...prev, ...next })


/**
 * Compositions
 */
export const fetchFriendsCompositions = (props) => ({
  url: config.baseUrl + '/compositions/friends',
  transform: (json, text) => {
    var compositions = json.reduce((acc, comp) => {
      acc[comp.id] = comp
      acc.friendIds.push(comp.id)
      return acc
    }, { friendIds: [] })
    return { compositions } 
  },
  update: {
    compositions: defaultUpdate,
  },
})

export const fetchCurrentUserCompositions = (props) => ({
  url: config.baseUrl + '/compositions/me',
  transform: (json, text) => {
    var compositions = json.reduce((acc, comp) => {
      acc[comp.id] = comp
      acc.myIds.push(comp.id)
      return acc
    }, { myIds: [] })
    return { compositions } 
  },
  update: {
    compositions: defaultUpdate,
  },
})

const _submitComposition = payload => ({
  url: config.baseUrl + '/compositions',
  body: payload,
  transform: (json, text) => {
    return { compositions: json }
  },
  update: {
    compositions: (compositions, composition) => {
      // HACK: I'm passing an the unmodified new composition in from
      // transform function as the `compositions` key.
      // Then I just tack it on where I need it.
      // Ugly, but it works.
      compositions[composition.id] = composition
      compositions.myIds = compositions.myIds || []
      compositions.myIds.unshift(composition.id)
      return compositions
    },
  },
  entities: {
    compositions: props => {
      debugger
      return defaultUpdate(props)
    },
  },
})

export const submitComposition = payload => mutateAsync(_submitComposition(payload))


/**
 * Prompts
 */
export const fetchPrompts = (props) => ({
  url: config.baseUrl + '/prompts',
  transform: (json, text) => {
    return { prompts: json }
  },
  update: {
    prompts: defaultUpdate,
  },
})
