import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormSubitemColeccion from "../../forms/editarSubitemColeccion";
import TitulosFormularios from "../../forms/tituloFormularios";
import Form from "./_form"
export default function ConfigSocio({mod}){

    const campo="config"
    const coleccion="mods"
    const datos=mod[campo]?mod[campo]:{}

     const valoresIniciales=()=>{
         return {nombre:"",tipo:""}
     }
     const callbackSuccess=()=>{
         
     }

    
    return(
    <Stack>
        <Typography variant="h4" component="div" gutterBottom>
            <TitulosFormularios titulo="CONFIGURACION" subTitulo="de socios" icono="fas fa-wrench"/>
        </Typography>
        <FormSubitemColeccion registro={mod} mod={mod} coleccion={coleccion} campo={campo} datos={datos} 
        callbackSuccess={callbackSuccess} 
        valoresIniciales={valoresIniciales}  >
            <Form />
        </FormSubitemColeccion>
    </Stack>
    )
}