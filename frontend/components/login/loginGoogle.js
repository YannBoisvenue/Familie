import firebase from 'firebase';
var config = {
  apiKey: 'AIzaSyAISaajbNSIj0v4fpxt3-WXfcTcZlrAVr4',
  authDomain: 'social-parent.firebaseapp.com',
  databaseURL: 'https://social-parent.firebaseio.com',
  projectId: 'social-parent',
  storageBucket: 'social-parent.appspot.com',
  messagingSenderId: '977472512701'
};
firebase.initializeApp(config);

export default firebase;
