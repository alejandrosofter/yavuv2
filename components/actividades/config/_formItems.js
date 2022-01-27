import Grid from '@mui/material/Grid';
import Input from "../../forms/input";
import { useState} from "react"
import SelectEstaticFormik from '../../forms/selectEstaticFormik';
import SwitchFormik from "../../forms/switch";
export default function FormItemConfigActividades({values}){
  const [visibleConfig,setVisibleConfig]=useState(values.generaDeuda?"block":"none")
  const cambiaGeneraDeuda=estado=>{

      setVisibleConfig(estado?"block":"none")
  }
    return(
      
         <Grid container spacing={2}>

            <Grid item md={6}><Input campo='detalle' label="Detalle" /></Grid>
            <Grid item md={5}><SelectEstaticFormik label="Tipo de Calculo Deuda" campo="tipoCalculoDeuda" items={["CUOTA SOCIAL","ACTIVIDADES"]}/></Grid>
            <Grid item md={3}><SwitchFormik callbackChange={cambiaGeneraDeuda} campo='generaDeuda' label="Genera Deuda" /></Grid>
            <Grid sx={{ display: visibleConfig,p:2 }} container spacing={2}>
                <Grid item md={8}><Input campo='aplicaDeudaConjunto' label="Aplica a ..." /></Grid>
                <Grid item md={6}><Input campo='desglosaCampo' label="Desglosa Por..." /></Grid>
                <Grid item md={12}><Input campo='calculoImporte' label="Calculo Importe" /></Grid>
                <Grid item md={12}><Input campo='fnDetalleConcepto' label="Fn Detalle Concepto" /></Grid>
                <Grid item md={12}><Input campo='fnDetalleExtra' label="Fn Detalle extra" /></Grid>
                <Grid item md={12}><Input label="Fn Label elemento" campo="fnLabelElemento"/></Grid>
                </Grid>
                {/* ({elemento})=>`${elemento.apellido} ${elemento.nombre}` */}
          </Grid>
       
    )
}