import lodash from 'lodash'

export const compositionsByFriends = state => {
  if (!lodash.get(state, 'entities.compositions.friendIds')) return []
  const compositions = state.entities.compositions
  return compositions.friendIds.map(id => compositions[id])
}
