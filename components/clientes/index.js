import DataGridFirebase from '../forms/datagrid/dataGridFirebase';
import firebase from "firebase/app"


import FirestoreConfig from "../../config/_firestoreConfig";
import { useEffect } from 'react';


export default function Modulo({modulo,mod,token}) {
 const busca=async()=>{
  const data = firebase.firestore().collection("formaPagos").get()

   
 }
  const url="/api/clientes"
const columns=[

  {
    field: 'nombre', 
    headerName: 'Nombre',
    width: 150,
    
  },
  {
    field: 'apellido', 
    headerName: 'Apellido',
    width: 100,
  },
          
  
]
      return (
        <DataGridFirebase coleccion={mod.coleccion} titulo={mod.label} subTitulo="generales" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy="apellido"
       columns={columns} />
      )

}