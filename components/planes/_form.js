import { Grid } from "@mui/material";
import { useCollection } from "@nandorojo/swr-firestore";
import Input from "../forms/input";
import ListaTransferencia from "../forms/listaTransferencia";

export default function _formPlanes({values,setFieldValue}){
const {data:dataModulos}=useCollection("modulos")
if(!dataModulos)return "Cargando Modulos..."
    return(
        <Grid sx={{pt:3}} md={12} container rowSpacing={2} spacing={2}>
                
            <Grid item md={7}><Input label="Nombre "  campo="nombre"/></Grid>
            <Grid item md={3}><Input label="Icono " campo="icono"/></Grid>
            <Grid item md={4}><Input label="Detalle " campo="detalle"/></Grid>
            <Grid item md={7}>
                <ListaTransferencia label="Modulos" campoId={"id"} campoLabel={"label"} items={dataModulos} campo="modulos"/>
            </Grid>
            
        </Grid>
    )
}