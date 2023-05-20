import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material";

import { useRouter } from "next/router";
import useSWR from "swr";
import EditarGenerico from "@components/EditarGenerico";

export default function EditarABM({
  mod,
  titulo,
  subTitulo,
  icono,
  modulo,
  token,
  coleccion,
  modelo,
  ComponenteForm,
  valoresIniciales,
}) {
  const router = useRouter();
  const urlAcepta = `/api/moduloABM?coleccion=${coleccion}`;

  return (
    <EditarGenerico
      token={token}
      urlAcepta={urlAcepta}
      valoresIniciales={valoresIniciales}
      modulo={modulo}
      modelo={modelo}
      esNuevo={true}
    >
      <ComponenteForm
        mod={mod}
        titulo={titulo}
        subTitulo={subTitulo}
        icono={icono}
      />
    </EditarGenerico>
  );
}
