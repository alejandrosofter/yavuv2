import React, { useState,useEffect } from "react";
import { Field } from "formik";

import { FormControl,InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

import { DataGrid } from '@mui/x-data-grid';
import { Button,Icon,Stack,Typography} from "@mui/material"
import {
  randomId
} from '@mui/x-data-grid-generator';

import ItemsModulo from "../forms/itemsModulo";


const DataGridFormikItems = ({label,campo,columns,icono,Modelo,FormularioItem,mod}) => {
    const [itemsGrid,setItemsGrid]=useState([])

  return (
<FormControl fullWidth>

  <Field label={label} name={campo} id={campo} >
    {(props) =>{
       
        return (
          <div style={{ height: 300, width: '100%' }}>
              
              <ItemsModulo
                   setFieldValue={props.form.setFieldValue} 
                   titulo={label} icono={icono}
                   campo={campo} data={props.form.values[campo]?props.form.values[campo]:{}} 
                   modelo={Modelo().innerType}
                   nombreModulo={label}
                   fullWidth={true} maxWidth={"md"}
                   textoEditar={`Puedes cambiar las acciones de esta accion:`}
                   textoAgregar={`Ingrese los datos de la accion`}
                   valoresIniciales={{detalle:""}} 
                   form={<FormularioItem mod={mod} />} 
                   dataModulo={[]} columnas={columns} 
                         />
          </div>
        );
    }}
    </Field>
</FormControl>
  )
      }

export default DataGridFormikItems;
