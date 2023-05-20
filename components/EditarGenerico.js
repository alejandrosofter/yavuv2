import { useRouter } from "next/router";
import useSWR from "swr";
import Loader from "./loader";
import _FormGenerico from "@components/_formGenerico";
import { useDocument, fuego } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import TitulosFormularios from "@components/forms/tituloFormularios";
import { Grid } from "@mui/material";
export default function EditarGenerico({
  idItem,
  callbackSuccess,
  coleccion,
  label,
  icono,
  pathDocExterno,
  urlAcepta,
  modelo,
  valoresIniciales,
  children,
}) {
  const router = useRouter();
  const pathDoc = pathDocExterno
    ? pathDocExterno
    : `${coleccion}/${idItem ? idItem : router.query.idItem}`;
  const { data, update } = useDocument(pathDoc);

  if (!data) return "Cargando data registro...";
  delete data.__snapshot; //NO DEJA ACTUALIZAR SIN ESTO
  return (
    <Grid container>
      <TitulosFormularios titulo={"EDITAR"} subTitulo={label} icono={icono} />
      <_FormGenerico
        fnUpdate={update}
        callbackSuccess={callbackSuccess}
        urlAcepta={urlAcepta}
        datos={data}
        modelo={modelo}
        valoresIniciales={valoresIniciales}
      >
        {children}
      </_FormGenerico>
    </Grid>
  );
}
