import config from '../../../config'  // FIXME: how to inject config into a node module?

export const fetchFriendsCompositions = (props) => ({
  url: config.baseUrl + '/compositions/friends',
  transform: (json, text) => {
    // TODO: normalizr
    var compositions = json.reduce((acc, comp) => {
      acc[comp.id] = comp
      acc.friendIds.push(comp.id)
      return acc
    }, { friendIds: [] })
    return { compositions } 
  },
  update: {
    compositions: (prevCompositions, newCompositions) => {
      // TODO: Understand this ...
      return {
        ...prevCompositions,
        ...newCompositions,
      }
    }
  },
})
