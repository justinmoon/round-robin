import * as firebase from 'firebase';

import config from './config';

const firebaseApp = firebase.initializeApp(config.firebase);
const database = firebase.database()

const extractSnapshotValue = snapshot => snapshot.val()

const normalizeCompositionsById = compositionsById => {
  return Object.keys(compositionsById).reduce((compositionsArray, id) => {
    const compositionWithId = Object.assign({}, compositionsById[id], { id })
    compositionsArray.push(compositionWithId)
    return compositionsArray
  }, [])
}

const submitComposition = (payload, callback) => {
  // TODO: validate payload shape
  var ref = database.ref();
  // TODO: API rename
  var compositions = ref.child('compositions')
  return compositions.push().set(payload)
}

const fetchCompositions = (callback) => {
  const ref = database.ref()
  const compositions = ref.child('compositions')
  return compositions.once('value')
    .then(extractSnapshotValue)
    .then(normalizeCompositionsById)
}

const fetchPrompts = () =>{
  var ref = database.ref();
  return ref.child('prompts')
    .once("value")
    .then(snapshot => snapshot.val())
}

export default {
  submitComposition,
  fetchCompositions,
  fetchPrompts,
}
