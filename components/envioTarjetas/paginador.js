import Select2Simple from "@components/forms/select2Simple";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Paginador({
  campoClave,
  data,
  paginaActual,
  cantidadTotal,
  setPaginaActual,
  cantidadPorPagina,
  setCampoClave,
}) {
  const [historyNexts, setHistoryNexts] = useState([]);
  const [nroPagina, setNroPagina] = useState(1);

  const guardarNexts = (nroPagina, valor) => {
    const nexts = [...historyNexts];
    nexts[nroPagina] = valor;
    setHistoryNexts(nexts);
  };
  const clickSiguiente = () => {
    setNroPagina(nroPagina + 1);
    guardarNexts(nroPagina + 1, data[data.length - 1][campoClave]);
    setPaginaActual(data[data.length - 1][campoClave]);
  };
  const clickAnterior = () => {
    setNroPagina(nroPagina - 1);
    setPaginaActual(historyNexts[nroPagina - 1]);
  };
  const cambiaOrder = (campo) => {
    if (campo) setCampoClave(campo.value);
  };
  return (
    <Grid>
      <Stack alignItems={"center"} direction="row" spacing={2}>
        <Typography variant="subtitle2">
          {`${nroPagina} / ${Math.ceil(cantidadTotal / cantidadPorPagina)}`}
        </Typography>
        <Button
          disabled={!paginaActual}
          variant="outlined"
          onClick={clickAnterior}
        >{`<< Anterior`}</Button>
        <Button
          disabled={nroPagina === Math.ceil(cantidadTotal / cantidadPorPagina)}
          onClick={clickSiguiente}
          variant="outlined"
        >{`Siguiente >>`}</Button>
        <Select2Simple
          callbackchange={cambiaOrder}
          campo="order"
          label="Ordenar"
          campoId="value"
          campoLabel="label"
          defaultValue={campoClave}
          lista={[
            { label: "Tarjeta", value: "idTarjeta" },
            { label: "Apellido", value: "apellido" },
          ]}
        />
      </Stack>
    </Grid>
  );
}
