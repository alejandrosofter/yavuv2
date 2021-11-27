import firebase from "firebase/app"
import 'firebase/storage'; 
function FirebaseConfig(){
    const firebaseConfig = {
        apiKey: "AIzaSyAS_0bOyLhlv9PtmQXiG0Xz5XsMyWYaOqE",
        authDomain: "yavu-98cac.firebaseapp.com",
        databaseURL: "https://yavu-98cac-default-rtdb.firebaseio.com",
        projectId: "yavu-98cac",
        storageBucket: "yavu-98cac.appspot.com",
        messagingSenderId: "67091902500",
        appId: "1:67091902500:web:a611f03c26cd59bc2ee8b1",
        measurementId: "G-8780TM8YPC"
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