import * as firebase from 'firebase';

import config from './config';

const firebaseApp = firebase.initializeApp(config.firebase);
const database = firebase.database()

const extractSnapshotValue = snapshot => snapshot.val()
const normalizeCreationsById = creationsById => {
  return Object.keys(creationsById).reduce((creationsArray, id) => {
    const creationWithId = Object.assign({}, creationsById[id], { id })
    creationsArray.push(creationWithId)
    return creationsArray
  }, [])
}

export function submitCreation(payload, callback) {
  // TODO: validate payload shape
  var ref = database.ref();
  var creations = ref.child('creations')
  return creations.push().set(payload)
}

export function fetchCreations(callback) {
  const ref = database.ref()
  const creations = ref.child('creations')
  return creations.once('value')
    .then(extractSnapshotValue)
    .then(normalizeCreationsById)
}

export function fetchPrompts() {
  var ref = database.ref();
  return ref.child('prompts')
    .once("value")
    .then(snapshot => snapshot.val())
}
