import { FieldArray,Field } from "formik";
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { Stack,Typography } from "@mui/material";
import ItemsModulo_agregar from "./agregar";
import ItemsModulo_editar from "./editar";
import ItemsModulo_eliminar from "./eliminar";
import randomId from "random-id"
export default function ItemsModulo({fnCambia,dataExtra,fnAddData,fullWidth,icono,titulo,maxWidth,campo,data,modelo,valoresIniciales,setFieldValue,columnas,dataModulo,form,nombreModulo,textoEditar,textoAgregar}){

  useEffect(() => {
    let aux=columnas
    aux.push({
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      getActions: (data) => {
        
        const handleEditClick = (data) => (event) => {
          event.stopPropagation();
          setDataSelecciona(data.row)
          
          setEditarVisible(true)
        };
      
        const handleDeleteClick = (data) => (event) => {
          event.stopPropagation();
          setDataSelecciona(data.row)
         
          setQuitarVisible(true)
        };
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            key="accion_editar"
            onClick={handleEditClick(data)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            key="accion_quitar"
            onClick={handleDeleteClick(data)}
            color="inherit"
          />,
        ];
      }})
      setCols(aux)
  }, [columnas,data])
  useEffect(()=>{
    console.log(data)
    if(data.length===0){
      setFieldValue(campo,[])
      console.log("no existe, se setea []")
    }
  },[])
  const [cols,setCols]=useState([])
 const [editarVisible,setEditarVisible]=useState(false)
 const [quitarVisible,setQuitarVisible]=useState(false)
 const [dataSelecciona,setDataSelecciona]=useState({})

  const clickEliminar=()=>{
    const nuevoArray=getDataEliminar(data,dataSelecciona.id)
    setFieldValue(campo,nuevoArray)
    
    setQuitarVisible(false)
    if(fnCambia)fnCambia(nuevoArray)
  }
  const closeEliminar=()=>{
    setQuitarVisible(false)
  }
  const clickVaciar=()=>{
    setFieldValue(campo,[])
    if(fnCambia)fnCambia([])
  }
  const setData=(data,newData)=>{
  
    var newArr=data.map(item=>{
      if(item.id==newData.id)return newData
      else return item
    })

    return newArr
  }
  const getDataEliminar=(data,idEliminar)=>{
    var newArr=[]
    data.map(item=>{
      if(item.id!=idEliminar)newArr.push(item)
    })

    return newArr
  }
  
  const clickAceptarModificar=(newData)=>{

    const nuevoArray=setData(data,newData)
    setFieldValue(campo,nuevoArray)
    setEditarVisible(false)
    if(fnCambia)fnCambia(nuevoArray)
  }
    return(
        
        <FieldArray name={campo}>
        {(props) =>{
          
            
            const clickTraer=(valores)=>{
             
              if(fnAddData)fnAddData(props)
                
           }
             const clickAceptar=(valores)=>{
         
               agregarData(valores)
                 
            }
            const agregarData=(valores)=>{
              if(valores){
                console.log(valores,campo)
                const nuevoArray=[...data?data:[],valores]
                
                setFieldValue(campo,nuevoArray)
                setEditarVisible(false)
                if(fnCambia)fnCambia(nuevoArray)
              }
         
            }
            return(
            <div style={{ height: 400}}>
                <Stack spacing={1} direction="row">
                {fnAddData  && dataExtra.length>0 && <IconButton onClick={clickTraer}>
  <Badge badgeContent={dataExtra?dataExtra.length:0} color="secondary">
  <Icon className="fas fa-arrow-down"/> 
  </Badge>
</IconButton>}
                  <ItemsModulo_agregar fullWidth={fullWidth} maxWidth={maxWidth} textoAgregar={textoAgregar} nombreModulo={nombreModulo} valoresIniciales={valoresIniciales} dataModulo={dataModulo} modelo={modelo} clickAceptar={clickAceptar} form={form}/>
                  <Button size="small" variant="outlined" onClick={clickVaciar}><Icon className="fas fa-trash"/> Vaciar</Button>
                  <Stack  direction="row" spacing={1} >
                    <Typography  variant="h5"> {titulo}</Typography>
                    <Icon className={icono}/>
                  </Stack>
                </Stack>
                
             <DataGrid rowHeight={25} 
        columns={cols}
        rows={data}
      />
      <ItemsModulo_eliminar nombreModulo={nombreModulo} open={quitarVisible} clickEliminar={clickEliminar} handleClose={closeEliminar}/>
      <ItemsModulo_editar fullWidth={fullWidth} maxWidth={maxWidth} textoEditar={textoEditar} nombreModulo={nombreModulo}  abierto={editarVisible} valoresIniciales={dataSelecciona} dataModulo={dataModulo} modelo={modelo} clickAceptar={clickAceptarModificar} form={form}/>
      </div>
        )
}}
        
      </FieldArray>
            
    )
}