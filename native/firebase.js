import * as firebase from 'firebase';
import config from './config';
const firebaseApp = firebase.initializeApp(config.firebase);
const database = firebase.database()


export function submitCreation(payload, callback) {
  // TODO: validate payload shape
  var ref = database.ref();
  var creations = ref.child('creations')
  return creations.push().set(payload)
}

export function fetchCreations(callback) {
  var ref = database.ref();
  var creations = ref.child('creations');
  return creations.once('value', function(data){
    var items = [];
    data.forEach(function(child){
      items.push(child.val())
    });
    callback(items);
  });
}

export function fetchPrompts(callback) {
  var ref = database.ref();
  return ref.child('prompts')
    .once("value", snapshot => callback(snapshot.val()))
}
