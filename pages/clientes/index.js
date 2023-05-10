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
    field: 'label_tipoCliente', 
    headerName: 'Tipo Cliente',
    width: 150,
    
  },
  {
    field: 'esEmpresa', 
    headerName: 'Empresa',
    width: 90,
    renderCell:params=>params.row.esEmpresa?"SI":"NO"
    
  },
  {
    field: 'nombre', 
    headerName: 'Nombre',
    width: 150,
    renderCell:params=>{
      if(params.row.esEmpresa)return params.row.razonSocial
      return `${params.row.apellido.toUpperCase()} ${params.row.nombre}`
    }
    
  },
  {
    field: 'dni', 
    headerName: 'DNI/CUIT',
    width: 150,
    renderCell:params=>{
      if(params.row.esEmpresa)return params.row.cuit
      return `${params.row.dni}`
    }
    
  },
          
  
]
      return (
        <DataGridFirebase coleccion={mod.coleccion} titulo={mod.label} subTitulo="generales" icono={mod.icono}
        limit={10} mod={mod} acciones={mod.acciones} orderBy="apellido"
       columns={columns} />
      )

}