import Grid from '@mui/material/Grid';
import Input from "../../forms/input";
import { useState} from "react"
import { fuego,useCollection } from '@nandorojo/swr-firestore';
import SwitchFormik from "../../forms/switch";
import SelectFormik from '../../forms/select';
export default function FormItemConfigActividades({values}){
  const [visibleConfig,setVisibleConfig]=useState(values.generaDeuda?"block":"none")
  const {data:modsDeuda}= useCollection(`mods`,
    { where:[
        ["generaDeuda","==",true],
        ["idUsuario","==",fuego.auth().currentUser.uid],
    ]})
  const cambiaGeneraDeuda=estado=>{

      setVisibleConfig(estado?"block":"none")
  }
  if(!modsDeuda)return "cargando mods..."
    return(
      
         <Grid container spacing={2}>

            <Grid item md={6}><Input campo='detalle' label="Detalle" /></Grid>
            <Grid item md={3}><SelectFormik  label="Modulo Genera Deuda" lista={modsDeuda} campoId="id" campoLabel="nombre" campo="modDeuda"/></Grid>
            <Grid item md={3}><SwitchFormik callbackChange={cambiaGeneraDeuda} campo='generaDeuda' label="Genera Deuda" /></Grid>
            <Grid sx={{ display: visibleConfig,p:2 }} container spacing={2}>
                <Grid item md={8}><Input campo='aplicaDeudaConjunto' label="Aplica a ..." /></Grid>
            
                <Grid item md={12}><Input campo='calculoImporte' label="Calculo Importe" /></Grid>
                <Grid item md={12}><Input campo='fnDetalleConcepto' label="Fn Detalle Concepto" /></Grid>
                <Grid item md={12}><Input campo='fnDetalleExtra' label="Fn Detalle extra" /></Grid>
                <Grid item md={12}><Input label="Fn Label elemento" campo="fnLabelElemento"/></Grid>
                </Grid>
                {/* ({elemento})=>`${elemento.apellido} ${elemento.nombre}` */}
          </Grid>
       
    )
}