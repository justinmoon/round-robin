import lodash from 'lodash'

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

