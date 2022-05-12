import firebase from "firebase/app"
import "firebase/firestore"
import * as admin from "firebase-admin";

import FirestoreConfig from "./_firestoreConfig";
import moment from 'moment';
export default function Firestore(){
  const config=FirestoreConfig();
const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(config)
).firestore()
return firestore
}

export async function updateArrayField({coleccion,id,datos,campo})
{
  const documento=await Firestore().collection(coleccion).doc(id);

await documento.update({
    [campo]: firebase.firestore.FieldValue.arrayUnion(datos)
})
}
export function getWhereCadena(cadena){
  const arr=cadena.split("==")
  if(arr.length>0){
    return  {campo:arr[0],operador:"==",valor:arr[1]}
  }
  return null
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
  return await getReference(await Firestore().collection(coleccion).add(data))
}
export async function remove(coleccion,params){
  return await Firestore().collection(coleccion).doc(params.id).delete()
}
async function getItem({user,coleccion,primero,desde,order})
{
  
  let q= Firestore().collection(coleccion).orderBy(order).limit(desde==0?1:desde)
  if(user)q=q.where("idUsuario","==",user.id)
  const data= await q.get()
  if(desde===0) return  data.docs[0];
  return  data.docs[data.docs.length-1];
}
export async function findAll(coleccion,user,sinUsuario,limite,page,pageSize)
{
  const order="fecha"
  let q
  if(sinUsuario) q=await Firestore().collection(coleccion).get()
    else {
   
      q=await Firestore().collection(coleccion).where("idUsuario","==",user.id)
      if(pageSize && page){
        const lastVisible=await getItem({user,order,coleccion,primero:true,desde:(page*pageSize)+1})
        q=q.orderBy(order)
       
        if(lastVisible)q=q.startAt(lastVisible)
        q=q.limit(pageSize)
      }
      if(limite)q=await q.limit(limite)
      q=await q.get()

    }
  return getArrayData(q)
}
export async function findAll2({coleccion,user,sinUsuario,limite,page,pageSize,wheres,orderBy})
{
  const order=orderBy?orderBy:"fecha"
  let q
  if(sinUsuario) q=await Firestore().collection(coleccion).get()
    else {
      
      q= Firestore().collection(coleccion)
      if(user)q=q.where("idUsuario","==",user.id)
      if(wheres)
      for (let index = 0; index < wheres.length; index++) {
        const where = wheres[index];
      
        q= q.where(where.campo,where.operador,where.valor)
      }
       
      if(pageSize && page){
        const lastVisible=await getItem({user,order,coleccion,primero:true,desde:(page*pageSize)+1})
        q=q.orderBy(order)
        
        if(lastVisible)q=q.startAt(lastVisible)
        q=q.limit(pageSize)
      }
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
export async function cantidadColeccion(coleccion,user)
{
  const snap=await Firestore().collection(coleccion).where("idUsuario","==",user.id).get()
  return snap.size
}
export async function cantidadColeccion2({coleccion,user,wheres})
{
  let q= Firestore().collection(coleccion)
  if(user)q=q.where("idUsuario","==",user.id)
  if(wheres)
      for (let index = 0; index < wheres.length; index++) {
        const where = wheres[index];
        q= q.where(where.campo,where.operador,where.valor)
      }
  const snap= await q.get()
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
export const getReference = async documentReference => {
  const res = await documentReference.get()
  const data = res.data()

  if (data && documentReference.id) {
    data.id = documentReference.id
  }

  return data
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

          tablas= await findOne(coleccion,pkRegistroMod)
          return getTipoDato(tablas)
        }
        else tablas= await Firestore().collection(coleccion).get();
   
            
        
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
export function getUser(){
  return firebase.auth().currenteUser
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