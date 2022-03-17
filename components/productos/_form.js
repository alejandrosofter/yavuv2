import { Grid,Stack } from "@mui/material";
import CheckboxForm from "../forms/checkbox";
import Input from "../forms/input"
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import Select2 from '../forms/select2Formik';
import { useCollection,fuego } from "@nandorojo/swr-firestore";
export default function Form({mod,setFieldValue,values}){
    const {data:centrosCosto}=useCollection("centroCostos",{where:["idUsuario","==",fuego.auth().currentUser.uid]})
  
    return(
        <Grid >
            <Stack>
                    <Grid sx={{pt:1,pb:1}} md={12} container rowSpacing={2} spacing={2}>
                    <Grid item xs={2}><CheckboxForm label="Es Servicio?" campo="esServicio"/></Grid>
                    <Grid item md={2}><Input label="Cantidad"  campo="cantidad"/></Grid>
                    <Grid item md={4}><Input label="Nombre"  campo="nombre"/></Grid>
                    
                    
                    <Grid item md={2}><Input label="Importe"  campo="importe"/></Grid>
                    <Grid item md={3}><SelectEstaticFormik items={["ACTIVO","INACTIVO"]}  label="ESTADO" campo="estado"/></Grid>
                    <Grid item md={3}><Select2 campo='idCentroCosto' label="Centro de Costo" lista={centrosCosto} campoId="id" 
            campoLabel="nombreCentroCosto" /></Grid>
                    <Grid item md={12}><Input label="Detalle"  campo="detalle"/></Grid>
                    </Grid>
                        
            </Stack>                  
        </Grid>
    )
}