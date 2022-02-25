import { useRouter } from "next/router";
import useSWR from "swr";import Loader from "./loader";
import _FormGenerico from "./_formGenerico";
import { useDocument, fuego } from '@nandorojo/swr-firestore'
import { useEffect,useState } from "react";
import TitulosFormularios from "./forms/tituloFormularios"
import { Grid } from "@mui/material";
export default function EditarGenerico({callbackSuccess,mod,pathDocExterno,urlAcepta,modelo,valoresIniciales,children})
{
  const router=useRouter()
  const pathDoc=pathDocExterno?pathDocExterno:`${mod.coleccion}/${router.query.idItem}`
  const { data,  update } = useDocument(pathDoc)

      if(!data)return "Cargando data registro..."
      delete data.__snapshot; //NO DEJA ACTUALIZAR SIN ESTO
    return(
    <Grid container>
      <TitulosFormularios titulo={"EDITAR"} subTitulo={mod.label} icono={mod.icono}/>
      <_FormGenerico fnUpdate={update} callbackSuccess={callbackSuccess}  
      urlAcepta={urlAcepta} datos={data} modelo={modelo} mod={mod} valoresIniciales={valoresIniciales} >
          
            {children}
         
      </_FormGenerico>
      </Grid>
    )
}
