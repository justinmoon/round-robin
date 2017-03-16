import lodash from 'lodash'

export const compositionsByFriends = state => {
  // FIXME: this is jank.
  // if (!lodash.get(state, 'entities.compositions.friendIds')) return []
  const friendIds = lodash.get(state, 'entities.compositions.friendIds', [])
  const compositions = lodash.get(state, 'entities.compositions', {})
  return friendIds.map(id => compositions[id])
}
