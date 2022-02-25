import firebase from "firebase/app"
import FirestoreConfig from "./_firestoreConfig";
import { fuego, useCollection } from '@nandorojo/swr-firestore'
import { Alert, Snackbar } from "@mui/material";
   

require("firebase/firestore");
export function errorDb(error)
{
  let mensaje=`Error General ==>${error.message}`
  if(error.message.includes("Missing or insufficient permissions"))
  mensaje= "No tienes permisos suficientes para hacer esta consulta"
  
  const e = new Error(error)
  console.error(error.message)
  e.status = e.status
  e.message=mensaje
  throw e
  
}
function dbFirestore(){
  const config=FirestoreConfig();
  const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(config)).firestore()
  return firestore
}
export function useFirebase(){
  const config=FirestoreConfig();
  const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(config))
  return firestore
}
export async function cantidadColeccion({coleccion,wheres})
{
  const q = fuego.db.collection(coleccion)
 
  if(wheres)
      for (let index = 0; index < wheres.length; index++) {
        const where = wheres[index];
        q= q.where(where.campo,where.operador,where.valor)
      }
  const snap= await q.get()
  return snap.size
}
export async function findOne(coleccion,id)
{
  var q= (await fuego.db.collection(coleccion).doc(id).get()).data();
  if(q){
    q.id=id //SI NO PONGO ESTO NO PUEDO REFERENCIAR EN LA VISTA POR QUE DATA SOLO TRAE DATOS DEL REGISTRO (SIN ID)
    return q
  }
  return null
   
}
export async function updateField({coleccion,id,registro})
{
  fuego.db.collection(coleccion).doc(id).update(registro).then(res=>{
    // console.log(res)
  }).catch(err=>{
    console.error(err)
  })


   
}
export async function getPrimeroPagina({coleccion,filtro,pagina})
{
  const ref = fuego.db.collection(coleccion)
 
  const q = ref.orderBy(filtro.orderBy)
      
      
      if(filtro.startAt)q=q.startAt(filtro.startAt)
      if(filtro.endAt)q=q.startAt(filtro.endAt)
    const results=await q.get()
  // const cantidadPaginas=Math.floor(results.size/filtro.limit)
   
  return results.docs[pagina*filtro.limit]
}
export async function usuarioLog()
{
  const ref = fuego.auth().currentUser
 console.log("ref",ref)
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
async function getItem({coleccion,desde,order})
{
  
  let q= Db().collection(coleccion).orderBy(order).limit(desde==0?1:desde)
 
  const data= await q.get()
  if(desde===0) return  data.docs[0];
  return  data.docs[data.docs.length-1];
}
export default function Db({}){
    return dbFirestore()
}
export async function findAll({coleccion,wheres,orderBy,pageSize,page,limite}){
    const order=orderBy?orderBy:"id"
    let q
    q= Db().collection(coleccion)
    if(wheres)
        for (let index = 0; index < wheres.length; index++) {
          const where = wheres[index];
          q= q.where(where.campo,where.operador,where.valor)
        }
         
    if(pageSize && page){
          const lastVisible=await getItem({order,coleccion,desde:(page*pageSize)+1})
          q=q.orderBy(order)
          if(lastVisible)q=q.startAt(lastVisible)
          q=q.limit(pageSize)
        }
    if(limite)q=await q.limit(limite)
    q=await q.get().catch(err=>{
      console.error(err)
      {
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {err}
        </Alert>
      </Snackbar>
      }
    
    })
  
      
    return getArrayData(q)
}