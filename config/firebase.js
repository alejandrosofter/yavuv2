import firebase from "firebase/app"
import "firebase/firestore"

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

export default function Firestore(){
  const config=FirebaseConfig();
const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(config)
).firestore()
return firestore
}

export function getArrayData(querySnapshot)
{
  var salida=[];
  querySnapshot.forEach((doc) => {
    
    var dataAux=doc.data()

    dataAux.id=doc.id;
    salida.push(dataAux);
});
return salida
}
export async function nuevo(coleccion,data){
  return await Firestore().collection(coleccion).add(data)
}
export async function remove(coleccion,params){
  return await Firestore().collection(coleccion).doc(params.id).delete()
}
export async function findAll(coleccion,params)
{
  const q=await Firestore().collection(coleccion).get();
  return getArrayData(q)
}
export async function findOne(coleccion,id)
{
  var q= (await Firestore().collection(coleccion).doc(id).get()).data();
 
   q.id=id //SI NO PONGO ESTO NO PUEDO REFERENCIAR EN LA VISTA POR QUE DATA SOLO TRAE DATOS DEL REGISTRO (SIN ID)
  return q
}
export async function findOneField(coleccion,{campo,valor})
{
  var res= (await Firestore().collection(coleccion).where(campo, '==', valor).get());
  var sal=[]
  res.forEach(doc => {
    sal.push({...doc.data(),id:doc.id})
  });
  if(sal.length>0) return sal[0]
  return null
}
export async function update(coleccion,params,campoId="id")
{
  return await Firestore().collection(coleccion).doc(params.id).update(params)
 

  
}