export default {
  firebase: {
    apiKey: "AIzaSyDQjp9VLJMKLqNPwCH-itdC5ICGP_la2N0",
    authDomain: "round-robin-prod.firebaseapp.com",
    databaseURL: "https://round-robin-prod.firebaseio.com",
    storageBucket: "round-robin-prod.appspot.com",
    messagingSenderId: "224639425263",
  },
	baseUrl: 'http://roundrob.in/api',
  DEFAULT_TARGET_DURATION: (5 * 60 + 1) * 1000,  // 5:01 b/c shit's fucked up
  // DEFAULT_TARGET_DURATION: 1,  // testing
  segmentWriteKey: '7YHCTFiD07VlEG7Lwt9aJw45wrQsC7BX',
  makeSegmentCalls: true,
}
