import EditarGenerico from "../EditarGenerico"
import ModeloCuentas,{valoresIniciales} from "../../modelos/ModeloCuentas"
import {  Grid } from "@mui/material"
import Input from "../forms/input"
import { useRouter } from "next/router"
import useSWR from "swr"
import Loader from "../loader"
import SelectFormik from "../forms/select"
import Fetch from "../../helpers/Fetcher"

export default function EditarCuenta({modulo,dataUsuario,auth,token}) {
    const router=useRouter();
    const urlAcepta=`/api/cuentas/micuenta`
    const urlModulos=`/api/modulos/` 
    const urlPlanes=`/api/planes/` 
    function verificacionModulos(values){
        const idPlan=values.plan
        const idUsuario=eval("auth.id")
        const url=`/api/planes/verificar/`
        Fetch(url,null,null,token)
    }
    const { data:dataModulos } = useSWR(urlModulos)
    const { data:dataPlanes} = useSWR(urlPlanes)
    if(!dataModulos)return <Loader texto="Cargando MODULO" />
    if(!dataPlanes)return <Loader texto="Cargando PLANES" />
      return (
      <EditarGenerico urlRegistro="/api/cuentas/micuenta" callbackSuccess={verificacionModulos} 
      urlAcepta={urlAcepta} valoresIniciales={valoresIniciales}
       modulo={modulo} token={token} esNuevo={false} modelo={ModeloCuentas} dataUsuario={dataUsuario} >
         
        
         <Grid sx={{pt:3}} md={12} container rowSpacing={2} spacing={2}>
                    
                    <Grid item md={10}><Input label="Usuario "  campo="idUsuario"/></Grid>
                    <Grid item md={6}><Input label="Nombre "  campo="nombre"/></Grid>
                        <Grid item md={6}><Input label="Email " campo="email"/></Grid>
                        <Grid item md={8}>
                            <SelectFormik label="Plan" campoId={"id"} campoLabel={"nombre"} lista={dataPlanes} campo="plan"/>
                        </Grid>
                      
                        <Grid item md={4}><Input label="Telefono " campo="telefono"/></Grid>
                            
                    </Grid>
          
       
      </EditarGenerico>
      )

}