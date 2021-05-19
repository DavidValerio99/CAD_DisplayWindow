import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyD4Ac5YCOqCig0RbZIkqdMCKB3t6PzxgH8",
  authDomain: "poc-medical-device.firebaseapp.com",
  databaseURL: "https://poc-medical-device-default-rtdb.firebaseio.com",
  projectId: "poc-medical-device",
  storageBucket: "poc-medical-device.appspot.com",
  messagingSenderId: "869213123259",
  appId: "1:869213123259:web:9c2e4016497df755332f9e"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export default firebase;
