import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useSWR from "swr"
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import _FormItemRelacion from "./_formItemRelacion"
import ItemsRelaciones from "./itemsRelaciones"
import SelectorOrigenData from "./selectorOrigenData"
import DialogContenido from "../../forms/dialogContenido";


   
export default function Step1_selectRegistro({setCompleted,setDatosSeleccionDesde,setDatosSeleccionHasta,textoRegistros,setTextoRegistros,stepValido,nroStep,setStepValido,token,completed}) {
  
    const router=useRouter();
    const [registroDesde, setRegistroDesde] = useState();
    const [registroHasta, setRegistroHasta] = useState();
    const [datosRegistros,setDatosRegistros]=useState();

    const handleChange = (event) => {
      setTextoRegistros(event.target.value);
    };
    const handleKeyUp = () => {
      let auxStep=stepValido
     
      
      if(textoRegistros!="")auxStep[nroStep]=true
      else auxStep[nroStep]=false
      setStepValido(auxStep)
      checkCompleted()
    };
    const checkCompleted=()=>{
      const newCompleted = completed;
        newCompleted[nroStep] = true;
        setCompleted(newCompleted);
        
    }
    const clickAgregar=e=>{
      let cad=""
      if(registroDesde=="root")
        datosRegistros.map(item=>{
          console.log(item)
          cad=`${cad} ['${item.key}','${item.key}'] `
        })
      else cad=(`${textoRegistros} ['${registroDesde}','${registroHasta}'] `)
      setTextoRegistros(cad)
      handleKeyUp()
    }
    
      return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
          <SelectorOrigenData 
          token={token}
          setDatosTodos={setDatosRegistros}
          idOrigenDatos={router.query.idItem}
          pathApiRegistro={`/api/origenesDatos/getRegistro/`}
          urlModulos={`/api/origenesDatos/getColecciones/${router.query.idItem}` }
          nombreModulo="ORIGEN DATA"
          titulo="ENTRADA"
          pkDefault="_id"
          setDatoSeleccion={setRegistroDesde}
          setObjectoSelector={setDatosSeleccionDesde}
          campoDataModulo={"name"}
          labelDataModulo={"name"} />

          <SelectorOrigenData 
          token={token}
          pathApiRegistro={`/api/mod/getRegistro/`}
          urlModulos={`/api/planes/getplan` }
          nombreModulo="MODULOS"
          setDatoSeleccion={setRegistroHasta}
          setObjectoSelector={setDatosSeleccionHasta}
          titulo="SALIDA"
          campoDataModulo={"idMod"}
          labelDataModulo={"nombre"} />
          
        
         
        
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography sx={{color:"violet"}} variant="h6"> {registroDesde}</Typography> 
        <Typography variant="h6"> {registroHasta} </Typography>
        <Button disabled={!(registroDesde)} onClick={clickAgregar}>Agregar</Button>
      </Stack>
      <TextField
       
          label="Pareja de datos a Importar"
          multiline
          rows={8}
          defaultValue=""
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          value={textoRegistros}
          placeholder="[desdeCampo,hastaCampo] "
          variant="filled"
        />
    
    </Stack>
      )

}