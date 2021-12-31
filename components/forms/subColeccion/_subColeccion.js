import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button,IconButton, Grid,Icon,Box } from '@mui/material';
import { useState,useCallback } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loader from "../../loader";
import dynamic from 'next/dynamic'
import { useEffect } from "react";
import Dialogo from "../dialogo"
import Fetch from '../../../helpers/Fetcher'
export default function SubColeccionColeccion({sortModel,campoId,titulo,accionesExtra,icono,registro,campo,columns,pathFormulario,token,urlAcepta}) {
  const [mostrarNuevo,setMostrarNuevo]=useState(false)
  const [mostrarEditar,setMostrarEditar]=useState(false)
  const [openDialogQuita,setOpenDialogQuita]=useState(false)
  const [seleccionGrid,setSeleccionGrid]=useState()
  const [columnas,setColumnas]=useState()
  
  useEffect(() => {
   const aux=columns
  const acciones=(params)=>{
   let arr=[
    <GridActionsCellItem
    icon={<Icon sx={{color:'red'}} fontSize="10" className="fas fa-trash"/>}
    label={<Typography color="red" >Quitar</Typography>}
    onClick={clickQuitar(params.row)}
    showInMenu
    />,
    
    <GridActionsCellItem
icon={<Icon fontSize="10" className="fas fa-pencil"/>}
label="Modificar"
onClick={clickEditar(params.row)}
showInMenu
/>,

  ]
    
    if(accionesExtra){
      const extra=accionesExtra(params)
      extra.map(item=>{
        arr.push(item)
      })
      
    }
    
    return arr
  }
   aux.push(
    {
      field: 'actions',
      type: 'actions',
      width: 70,
      getActions: acciones,
    }
   )
    setColumnas(aux)
  },[accionesExtra])

  const clickAgregar=e=>{
    setMostrarNuevo(true);
  }
  const clickEditar = useCallback(
    (data) => () => {
      setSeleccionGrid(data)
      setMostrarEditar(true)
    },
    [],
  );
  const callbackElimina = async ()=> {
      const res=await Fetch(urlAcepta,"DELETE",seleccionGrid,token)
      setOpenDialogQuita(false)
    }
  
  const clickQuitar = useCallback(
    (id) => () => {
      setSeleccionGrid({id,idRegistroPadre:registro.id})
      setOpenDialogQuita(true)
    },
    [],
  )
const handleClose = () => {
  setMostrarNuevo(false);
};
const callbackSuccess=(vals) => {
  setMostrarNuevo(false);
  console.log(vals)
}
///////////////////////
const handleCloseEditar = () => {
  setMostrarEditar(false);
};
const callbackSuccessEditar=(vals) => {
  setMostrarEditar(false);
  
}
const ComponenteForm = dynamic(
  () => import(`../../${pathFormulario}`),
  { loading: ({error,timedOut,isLoading}) => {
    if(isLoading)return "cargando..."
    if(error)return <p>{`Error al cargal el componente (${error})`}</p> 
    if(timedOut)return <p>Tiempo de espera agotado</p> 
    
  }}
)
const fnRows=()=>{
  //ALGUNOS CAMPOS VIENEN STRING y con el _ID que para datagrid tiene que ser id
 
  if(Array.isArray(registro[campo]))
    return registro[campo].map(item=>{item.id=item[campoId?campoId:"id"]; return item})
  return []
}
      return (
        <Grid item flex={1}>
        <Stack direction="row" spacing={3}>
        <Button  color="primary" variant="outlined" size="small" onClick={clickAgregar}><Icon className={"fas fa-plus"}></Icon> AGREGAR</Button>
            <Stack flex={1}  direction="row" spacing={1} >
              <Typography  variant="h5"> {titulo}</Typography>
              <Icon className={icono}/>
            </Stack>
            
        </Stack>
        <div style={{ height: 400, width: '100%' }}>
          {columnas && 
        <DataGrid
        sortModel={sortModel}
        rows={fnRows()}
        columns={columnas}
        pageSize={10}
      />
          }
      </div>
      <Dialog open={mostrarNuevo} onClose={handleClose}>
        <DialogTitle>NUEVO</DialogTitle>
        <DialogContent>
          <ComponenteForm callbackSuccess={callbackSuccess} registro={registro} token={token} urlAcepta={urlAcepta}/>
         
        </DialogContent>
        
      </Dialog>
      <Dialog open={mostrarEditar} onClose={handleCloseEditar}>
        <DialogTitle>EDITAR</DialogTitle>
        <DialogContent>
          <ComponenteForm  datos={seleccionGrid} registro={registro} callbackSuccess={callbackSuccessEditar} token={token} urlAcepta={urlAcepta}/>
         
        </DialogContent>
        
      </Dialog>
      <Dialogo icon="fas fa-exclamation-triangle" open={openDialogQuita} setOpen={setOpenDialogQuita}
      titulo="Deseas eliminar este elemento?" callbackAcepta={callbackElimina} />
    </Grid>
      )

}