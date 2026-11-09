import firebase from "firebase/app"
import 'firebase/storage'; 
function FirebaseConfig(){
    const firebaseConfig = {
        apiKey: "AIzaSyCTG6nAsEhsIrFS6T-UYNiD3musjj3pwvE",
        authDomain: "yavu2-ba118.firebaseapp.com",
        databaseURL: "https://yavu2-ba118-default-rtdb.firebaseio.com",
        projectId: "yavu2-ba118",
        storageBucket: "yavu2-ba118.firebasestorage.app",
        messagingSenderId: "763763344977",
        appId: "1:763763344977:web:f96d8f075b64e290601a70",
        measurementId: "G-NJ75CHE5VR"
      };
    return firebaseConfig
}

export default function Storage(){
  const config=FirebaseConfig();
const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(config)
).firestore()
const storageRef = firebase.storage().ref();
return storageRef;
}