import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "super secret keys.....asgvegxgevergfvr",
  authDomain: "tallans-imageupload-tutorial.firebaseapp.com",
  databaseURL: "https://tallans-imageupload-tutorial.firebaseio.com",
  projectId: "tallans-imageupload-tutorial",
  storageBucket: "tallans-imageupload-tutorial.appspot.com",
  messagingSenderId: "super secret keys.....asgvegxgevergfvr",
  appId: "super secret app id....adsfa;lsdkjf",
  measurementId: "super secret as;dlkfjal;dskjf",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();

export { storage, firebase as default };
