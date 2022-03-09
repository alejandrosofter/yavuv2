import Grid from '@mui/material/Grid';
import Input from "../../forms/input";
import {Stack,Typography} from "@mui/material"
import { useState} from "react"
import Select from '../../forms/select';
import { useCollection,fuego } from '@nandorojo/swr-firestore'
import SwitchFormik from "../../forms/switch";

export default function FormItemConfigSocios({values}){
  const [visibleConfig,setVisibleConfig]=useState(values.generaDeuda?"block":"none")
  const {data:modsDeuda}= useCollection(`mods`,
    { where:[
        ["generaDeuda","==",true],
        ["idUsuario","==",fuego.auth().currentUser.uid],
    ]})

  const cambiaGeneraDeuda=estado=>{

      setVisibleConfig(estado?"block":"none")
  }
  if(!modsDeuda)return "cargando mods.."
    return(
      
         <Grid container spacing={2}>

            <Grid item md={6}><Input campo='detalle' label="Detalle" /></Grid>
            <Grid item md={3}><Select label="Modulo Genera Deuda" lista={modsDeuda} campoId="id" campoLabel="nombre" campo="modDeuda"/></Grid>
            <Grid item md={3}><SwitchFormik callbackChange={cambiaGeneraDeuda} campo='generaDeuda' label="Genera Deuda" /></Grid>
            <Grid 	sx={{ display: visibleConfig,p:2 }} container spacing={2}>
                <Grid item md={8}><Input  campo='aplicaDeudaConjunto' label="Aplica a ..." /></Grid>
            
                <Grid item md={12}><Input campo='calculoImporte' label="Calculo Importe" /></Grid>
                <Grid item md={12}><Input  campo='fnDetalleConcepto' label="Fn Detalle Concepto" /></Grid>
                <Grid item md={12}><Input campo='fnDetalleExtra' label="Fn Detalle extra" /></Grid>
                <Grid item md={12}><Input label="Fn Label elemento" campo="fnLabelElemento"/></Grid>
                </Grid>
                <Stack direction="row" spacing={2}>
                 <Typography sx={{color: "#31877fde",pl:4}}>Variables usables: {"${nombreActividad}${actividad},${calculoTipoSocio},${nombre}, ${apellido},${sociosActivos}, ${edad}, ${tipoSocio}"}</Typography>
                </Stack>
          </Grid>
       
    )
}