import firebase from "firebase/app"
import "firebase/firestore"
import * as admin from "firebase-admin";
import FirestoreConfig from "./_firestoreConfig";

export default function Firestore(){
  const config=FirestoreConfig();
const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(config)
).firestore()
return firestore
}

export  function Firebase(){
  // const app = admin.initializeApp();
return admin.auth()
}

export function getArrayData(querySnapshot)
{
  var salida=[];
  if(querySnapshot)
  querySnapshot.forEach((doc) => {
    
    var dataAux=doc.data()

    dataAux.id=doc.id;
    salida.push(dataAux);
});
return salida
}
export function getModsArrayData(querySnapshot)
{
  var salida=[];
  if(querySnapshot)
  querySnapshot.forEach((doc) => {
    
    var dataAux=doc.data()
    
    dataAux.id=doc.id;
    salida=salida.concat(dataAux.mods);
    
});
return salida
}
export async function nuevo(coleccion,data){
  return await Firestore().collection(coleccion).add(data)
}
export async function remove(coleccion,params){
  return await Firestore().collection(coleccion).doc(params.id).delete()
}
export async function findAll(coleccion,user,sinUsuario,limite)
{
  let q
  if(sinUsuario) q=await Firestore().collection(coleccion).get()
    else {
      q=await Firestore().collection(coleccion).where("idUsuario","==",user.id)
      if(limite)q=await q.limit(limite)
      q=await q.get()

    }
  return getArrayData(q)
}
export async function countCollection(coleccion)
{
  const snap=await Firestore().collection(coleccion).get()
  return snap.size
}
export async function findIn(coleccion,campo,arrIn,user)
{
  const query=await Firestore().collection(coleccion);
  arrIn.map(w=>{
    query.where(campo,"==",w)
  })
  if(user)query=query.where("idUsuario","==",user.id)
  return getArrayData(await query.get())
}
export async function findModsInvitados(email)
{
  
  const query=await Firestore().collection("usuariosInvitados").where("email","==",email).where("activo","==",true).get();
  
  return getModsArrayData(query)
}
function getTipoDato(obj)
{
    let salida=[]
    Object.keys(obj).forEach(key => {
        let tipo=Array.isArray(obj[key])?"array":typeof obj[key]
        if(obj[key] instanceof Date) tipo="date"
        let aux={key,tipo}
        if(tipo=="array"){
            const arrObj=obj[key].length>0?obj[key][0]:{}
          
            aux.registro=getTipoDato(arrObj)
        }
        
        salida.push(aux) 
      });
      return salida;
}
export async function getRegistro(coleccion,pkRegistroMod)
{
        let tablas
        
        if(pkRegistroMod){
          console.log("one")
          tablas= await findOne(coleccion,pkRegistroMod)
          return getTipoDato(tablas)
        }
        else tablas= await Firestore().collection(coleccion).get();
        console.log("moe")
            
        
        const arr= getArrayData(tablas)
        
        if(arr.length>0){
            const obj=arr[0]
            let salida=getTipoDato(arr[0])
            return salida
        }
        return {}
}
export async function findMods(coleccion,idUsuario,soloBase)
{
  const query=await Firestore().collection(coleccion);
  let q=await query.where("idUsuario","==",idUsuario).where("estado","==",true)
  if(soloBase)q=await q.where("esBase","==",true)
  else q=await q.where("esBase","==",false)
  q= await q.orderBy("fechaClick","desc").get()
  return getArrayData(q)
}
export async function findOne(coleccion,id)
{
  var q= (await Firestore().collection(coleccion).doc(id).get()).data();
  if(q){
    q.id=id //SI NO PONGO ESTO NO PUEDO REFERENCIAR EN LA VISTA POR QUE DATA SOLO TRAE DATOS DEL REGISTRO (SIN ID)
    return q
  }
  return null
   
}
export function Timestamp()
{
  return admin.firestore.Timestamp
}
export function ServerStamp()
{
  return admin.firestore.FieldValue.serverTimestamp()
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
export async function findWhere(coleccion,whereArr,soloUno)
{
  var query= await Firestore().collection(coleccion);
  whereArr.map(w=>{
    query.where(w.campo,"==",w.valor)
  })
  const res=await query.get()
  var sal=[]
  res.forEach(doc => {
    sal.push({...doc.data(),id:doc.id})
  });
  if(sal.length>0 && soloUno) return sal[0]
  if(soloUno)return {}
  return sal
}
export async function findByField(coleccion,{campo,valor})
{
  var res= (await Firestore().collection(coleccion).where(campo, '==', valor).get());
  var sal=[]
  res.forEach(doc => {
    sal.push({...doc.data(),id:doc.id})
  });
  return sal
}
export async function update(coleccion,params,campoId="id")
{
  return await Firestore().collection(coleccion).doc(params.id).update(params)
 

  
}
export async function agregar(coleccion,params,user)
{
  params.idUsuario=user.id
  return await Firestore().collection(coleccion).doc(params.id).set(params);
 

  
}