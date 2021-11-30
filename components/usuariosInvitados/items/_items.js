import { FieldArray,Field } from "formik";
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import EditarItemInvitados from "./editarItem";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { Icon } from "@material-ui/core";
import { Stack } from "@mui/material";
import BotonDialogForm from "./nuevoItem";
export default function _itemsUSuariosInvitados({campo,data,modelo,setFieldValue,columnas,mods,form}){
  
  useEffect(() => {
    let aux=columnas
    aux.push({
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      getActions: (data) => {
        

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(data)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(data)}
            color="inherit"
          />,
        ];
      }})
      console.log(aux)
      setCols(aux)
  }, [])
  const [cols,setCols]=useState([])
 const [editarVisible,setEditarVisible]=useState(false)
 const [dataSelecciona,setDataSelecciona]=useState({})
  const handleEditClick = (data) => (event) => {
    event.stopPropagation();
    setDataSelecciona(data.row)
    setEditarVisible(true)
  };

  const handleDeleteClick = (data) => (event) => {
    event.stopPropagation();
    setDataSelecciona(data.row)
  };
  const clickVaciar=()=>{
    setFieldValue(campo,[])
  }
  const setData=(data,newData)=>{
  
    var newArr=data.map(item=>{
      console.log(item,newData)
      if(item.id==newData.id)return newData
      else return item
    })

    return newArr
  }
  const clickAceptarModificar=(newData)=>{

    const nuevoArray=setData(data,newData)
    setFieldValue(campo,nuevoArray)
    setEditarVisible(false)
  }
    return(
        
        <FieldArray name={campo}>
        {(props) =>{
             const clickAceptar=(valores)=>{
              props.push(valores)
            }
            return(
            <div style={{ height: 400,}}>
                <Stack direction="row">
                  <BotonDialogForm form={form}  mods={mods} valoresIniciales={{idModulo:"",habilitado:false}} modelo={modelo} clickAceptar={clickAceptar}/>
                  <Button variant="text" onClick={clickVaciar}><Icon className="fas fa-trash"/> Vaciar</Button>
                </Stack>
             <DataGrid rowHeight={25} components={{
          
        }}
        columns={cols}
        rows={data}
      />
      
           
        
         
        <EditarItemInvitados 
        clickAceptar={clickAceptarModificar} 
        valoresIniciales={dataSelecciona} 
        modelo={modelo} 
        mods={mods}
        abierto={editarVisible} />
      </div>
        )
}}
        
      </FieldArray>
            
    )
}