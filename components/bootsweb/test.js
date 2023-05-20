import TitulosFormularios from "@components/forms/tituloFormularios";

import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import DialogContenido from "@components/forms/dialogContenido";
export default function TestBootWeb({ open = false, setOpen, data }) {
  const [resultados, setResultados] = useState();
  const [loading, setLoading] = useState(false);
  const [dataInputs, setDataInputs] = useState([]);
  useEffect(() => {
    localStorage.setItem("dataInputs", JSON.stringify(dataInputs));
  }, [dataInputs]);
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("dataInputs")
        ? localStorage.getItem("dataInputs")
        : "[]"
    );
    setDataInputs(data);
  }, []);
  const test = async () => {
    setLoading(true);
    localStorage.setItem("dataInputs", JSON.stringify(dataInputs));
    const res = await axios.post(`/api/bootsWeb/${data?.id}`, {
      ...dataInputs,
      id: data?.id,
    });
    setResultados(JSON.stringify(res.data));
    setLoading(false);
  };
  const cambia = (item, ev) => {
    let aux = dataInputs;
    aux[item.nombre] = ev.target.value;
    setDataInputs(aux);
  };
  const getValor = (item) => {
    return dataInputs[item.nombre];
  };
  if (!data) return "";

  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="md"
      open={open}
      setOpen={setOpen}
    >
      <Grid spacing={2} justifyContent="flex-end" container>
        <Grid item md={12}>
          <TitulosFormularios titulo={"TESTING"} subTitulo={`Boots web`} />
        </Grid>
        <Grid container item md={12}>
          {data.entradas &&
            data.entradas.map((item) => (
              <Grid key={item.id} item md={2}>
                <TextField
                  defaultValue={getValor(item)}
                  onChange={cambia.bind(this, item)}
                  label={item.nombre}
                />
              </Grid>
            ))}
          <Grid item>
            <Button variant="outlined" onClick={test}>
              INICIAR TEST
            </Button>
          </Grid>
        </Grid>

        <Grid item md={12}>
          <TitulosFormularios subTitulo="RESULTADOS" />
          {resultados}
        </Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </DialogContenido>
  );
}
