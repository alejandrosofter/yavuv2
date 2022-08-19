import MuestraImagen from "@components/forms/muestraImagen";
import SelectSimple from "@components/forms/selectSimple";
import { Grid, Typography, Stack, Button, IconButton } from "@mui/material";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";

export default function SlideSocios({ callBackCambia, mod, seleccion }) {
  const campo = "nroSocio";

  const [startAfter, setAfter] = useState(
    seleccion ? Number(seleccion[campo]) : null
  );
  const [startBefore, setBefore] = useState(null);
  const [tipoSocio, setTipoSocio] = useState(
    localStorage.getItem("tipoSocioSlide")
  );
  useEffect(() => {
    setAfter(seleccion ? Number(seleccion[campo]) : null);
  }, [seleccion]);
  const tipoSocios = mod?.config?.itemsTipoSocios
    ? mod.config.itemsTipoSocios
    : [];
  const { data, error, update } = useCollection("socios", {
    where: [
      ["idUsuario", "==", fuego.auth().currentUser?.uid],
      ["estado", "==", "ALTA"],
      ["tipoSocio", "==", tipoSocio],
    ],
    limit: 10,
    orderBy: campo,
    startAfter,
    listen: true,
  });
  const getUltimoTipo = (idTipo) => {
    const ultimo = 0;

    mod?.config?.itemsTipoSocios.forEach((item) => {
      console.log(idTipo, item);
      if (item.id === idTipo) {
        ultimo = Number(item.proximoNro);
      }
    });
    console.log(ultimo);
    return ultimo;
  };
  const clickSocio = (item) => {
    if (callBackCambia) callBackCambia({ ...item, objectID: item.id });
  };
  const cambiaTipoSocio = (item) => {
    localStorage.setItem("tipoSocioSlide", item);
    setTipoSocio(item);
  };
  return (
    <Grid alignItems={`center`} spacing={1} sx={{ p: 2 }} container>
      <Grid item md={2}>
        <SelectSimple
          label="Tipo de socio"
          valorInicial={localStorage.getItem("tipoSocioSlide")}
          campoLabel="nombre"
          campoValue="id"
          fn={cambiaTipoSocio}
          lista={tipoSocios}
          onChange={(e) => {
            setAfter(null);
          }}
        />
      </Grid>
      <Grid item>
        {" "}
        <IconButton
          variant="outlined"
          size="small"
          title="IR AL INICIO"
          color="secondary"
          sx={{ width: "20px", p: 1 }}
          onClick={() => {
            setAfter(null);
            setBefore(null);
          }}
        >
          {`<<`}
        </IconButton>
      </Grid>
      <Grid item>
        {" "}
        <IconButton
          variant="outlined"
          size="small"
          title="PAGINA ANTERIOR"
          color="primary"
          sx={{ width: "20px", p: 1 }}
          onClick={() => {
            setAfter(data[0][campo] - 10);
          }}
        >
          {`<`}
        </IconButton>
      </Grid>
      <Grid
        alignItems={`center`}
        direction="row"
        justifyContent="space-evenly"
        container
        md={8}
      >
        {data &&
          data.map((item) => (
            <Stack
              key={item.id}
              onClick={clickSocio.bind(this, item)}
              sx={{ cursor: "pointer" }}
            >
              <MuestraImagen
                title={`${item.apellido} ${item.nombre}`}
                w={40}
                h={40}
                pathImagen={item.foto}
              />
              <Typography variant="caption">
                {`${item.nroSocio}`.padStart(6, 0)}
              </Typography>
            </Stack>
          ))}
      </Grid>
      <Grid item>
        {" "}
        <IconButton
          variant="outlined"
          size="small"
          title="PAGINA SIGUIENTE"
          color="primary"
          sx={{ width: "20px", p: 1 }}
          onClick={() => {
            setAfter(data[data.length - 1][campo]);
          }}
        >
          {`>`}
        </IconButton>
      </Grid>
      <Grid item>
        {" "}
        <IconButton
          variant="outlined"
          title="IR ULTIMA PAGINA"
          size="small"
          color="secondary"
          sx={{ width: "20px", p: 1 }}
          onClick={() => {
            setAfter(getUltimoTipo(tipoSocio));
          }}
        >
          {`>>`}
        </IconButton>
      </Grid>
    </Grid>
  );
}
