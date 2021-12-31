import firebase from "firebase/app"
import FirestoreConfig from "./_firestoreConfig";
import 'firebase/storage';
export default function Storage(){
  const config=FirestoreConfig();
const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(config)
)
return firestore.storage()
}
