import * as firebase from 'firebase';
import config from './config';
const firebaseApp = firebase.initializeApp(config.firebase);
const database = firebase.database()


export function submitCreation(username, prompt, body) {
  var ref = database.ref();
  var creations = ref.child('creations');
  return creations.push().set({ username, prompt, body });
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

/**
 * How do we avoid these ugly callbacks?
 */
export function getPrompt(callback) {
  var shortISODateString = new Date().toISOString().substring(0, 10)
  var ref = database.ref();
  ref.child('prompts')
     .child(shortISODateString)
     .on("value", snapshot => callback(snapshot.val()))
}
