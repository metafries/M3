import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAAodDcLQNNtTQQLM9-Bj4x-TWdfZ9bOIk",
  authDomain: "mfries2fs-1361d.firebaseapp.com",
  databaseURL: "https://mfries2fs-1361d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mfries2fs-1361d",
  storageBucket: "mfries2fs-1361d.appspot.com",
  messagingSenderId: "144678630266",
  appId: "1:144678630266:web:a215caace14389170edcc3"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;