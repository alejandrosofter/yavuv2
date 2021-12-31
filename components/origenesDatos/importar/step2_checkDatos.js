import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Fetch from '../../../helpers/Fetcher';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
export default function Step2_checkDatos({stepValido,nroStep,seleccionDesde,seleccionHasta,textoRegistros,token}){
    const [pkDesde, setPkDesde] = useState("");
    const [pkHasta, setPkHasta] = useState("");
    const [estadoConsulta, setEstadoConsulta] = useState("");
    const [contadorUpdate, setContadorUpdate] = useState(0);
    const [contadorCreate, setContadorCreate] = useState(0);
    const [importando, setImportando] = useState(false);
    const router=useRouter();
    const [checkImportacion, setCheckImportacion] = useState({cantidadDatos:0});
   
    const handleChangeDesde = (event) => {
        setPkDesde(event.target.value);
      }
      const handleChangeHasta = (event) => {
        setPkHasta(event.target.value);
      }
      const clickComenzar = async (event) => {
        const url=`/api/origenesDatos/importarDatos`
        let cantidadRegistros=10
        let nPagina=0
        const cantidadPaginas=Math.floor(checkImportacion.cantidadDatos/cantidadRegistros)
        setImportando(true)
        setContadorUpdate(0)
          setContadorCreate(0)
          setEstadoConsulta(``)
          let updates=0
          let creates=0
        for (let index = 0; index < cantidadPaginas; index++) {
          const dataSend={nPagina:index,cantidadRegistros:cantidadRegistros,idOrigenDatos:router.query.idItem,textoRegistros,pkDesde,pkHasta,seleccionDesde:seleccionDesde.name,seleccionHasta:seleccionHasta.id}   
          setEstadoConsulta(`${estadoConsulta} enviando  ${index}/${cantidadPaginas} `)
          const data=await Fetch(url,"post",dataSend,token)
          setEstadoConsulta(`${estadoConsulta} ok! --- `)
          
          updates+=data.contadorUpdate
          creates+=data.contadorCreate
          setContadorUpdate(updates)
          setContadorCreate(creates)
          
        }
        setImportando(false)
      }
      const clickCheck = async (event) => {
        const url=`/api/origenesDatos/checkImportacion`
        const dataSend={idOrigenDatos:router.query.idItem,textoRegistros,pkDesde,pkHasta,seleccionDesde:seleccionDesde.name,seleccionHasta:seleccionHasta.id}   
        const data=await Fetch(url,"post",dataSend,token)
        
            setCheckImportacion(data)
      }
      
      useEffect(() => {
        console.log(textoRegistros)
        console.log(seleccionDesde)
        console.log(seleccionHasta)
      }, [textoRegistros,seleccionDesde,seleccionHasta])
    return(
        <Stack>
             <Stack direction="row" spacing={2}>
                    <TextField
                    label="PK desde"
                    defaultValue="id"
                    onChange={handleChangeDesde}
                    placeholder="id"
                    variant="filled"
                    />
                    <TextField
                    label="PK hasta"
                    defaultValue="id"
                    onChange={handleChangeHasta}
                    placeholder="id"
                    variant="filled"
                    />
                    
             </Stack>
             <Stack direction="row" spacing={2}>
                        <Typography sx={{color:"violet",fontSize:10}} variant="h6"> {textoRegistros}</Typography> 
                        
                    </Stack>
             <Stack direction="row" spacing={2}>
              <Button  onClick={clickCheck}>Chequear DATOS</Button>
              <Typography sx={{color:"blue"}} variant="h6"> Hay {checkImportacion.cantidadDatos} registros para importar</Typography> 
              
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" disabled={!checkImportacion.cantidadDatos>0 && importando} onClick={clickComenzar}>COMENZAR IMPORTACION</Button>
              <Typography sx={{fontSize:10}} variant="subtitle1"> {`RESULTADOS: ${JSON.stringify(estadoConsulta)}`}</Typography> 
              <Typography sx={{fontSize:10}} variant="subtitle1"> {`UPDATE: ${contadorUpdate} CREATE: ${contadorCreate}`}</Typography> 
             </Stack>
             
        </Stack>
    )
}