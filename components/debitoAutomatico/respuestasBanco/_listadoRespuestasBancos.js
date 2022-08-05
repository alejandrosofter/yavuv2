import ListaSimple from "@components/forms/listaSimple";
import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import {
  Button,
  Grid,
  Icon,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";
import NuevaRespuestaBanco from "./nuevo";

export default function ListadoRespuestasBanco({ idDebito, callbackcambia }) {
  const { data } = useCollection(
    `debitoAutomatico/${idDebito}/respuestasBanco`,
    { listen: true }
  );
  const [dataConsulta, setDataConsulta] = useState();
  const [openNew, setOpenNew] = useState(false);
  const [seleccion, setSeleccion] = useState();
  const [coleccionElimina, setColeccionElimina] = useState();
  const { deleteDocument } = useDocument(coleccionElimina);
  const clickAdd = async () => {
    setOpenNew(true);
  };
  const successNew = () => {
    setOpenNew(false);
  };
  const clickLista = (item) => {
    if (callbackcambia) callbackcambia(item);
    setSeleccion(item);
  };
  const clickEliminar = (item) => {
    const aux = `debitoAutomatico/${idDebito}/respuestasBanco/${item.id}`;
    setColeccionElimina(aux);
    console.log(aux);
    if (item)
      deleteDocument()
        .then(() => {
          console.log("Eliminado");
          if (callbackcambia) callbackcambia(null);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const successQuery = (data) => {
    console.log(data);
  };
  const clickAplicar = (data) => {
    setDataConsulta({
      url: "/api/debitoAutomatico/aplicarRespuestaBanco",
      data,
    });
  };
  const clickDesaplicar = (data) => {
    setDataConsulta({
      url: "/api/debitoAutomatico/desaplicarRespuestaBanco",
      data,
    });
  };
  return (
    <Grid container>
      <Grid item md={8}>
        <Typography variant="h6">RESPUESTAS BANCO</Typography>
      </Grid>
      <Grid item md={1}>
        <Button
          variant="outlined"
          title="Nueva Respuesta del banco"
          className="fas fa-plus"
          onClick={clickAdd}
        />
      </Grid>

      <Grid item xs={12}>
        <ListaSimple
          ComponentSecondaryAction={(item) => {
            return (
              <Stack direction="row" spacing={2}>
                {item.estado !== "PENDIENTE" && (
                  <IconButton
                    onClick={clickEliminar.bind(this, item)}
                    title="Eliminar"
                    edge="end"
                    aria-label="eliminar"
                  >
                    <Icon sx={{ color: "red" }} className="fas fa-trash" />
                  </IconButton>
                )}
                {true && (
                  <IconButton
                    onClick={clickAplicar.bind(this, item)}
                    title={item.estado}
                    edge="end"
                    aria-label="aplicar"
                  >
                    <Icon className="fas fa-plug" />
                  </IconButton>
                )}
                {true && (
                  <IconButton
                    onClick={clickDesaplicar.bind(this, item)}
                    title={item.estado}
                    edge="end"
                    aria-label="desaplicar"
                  >
                    <Icon className="fas fa-minus" />
                  </IconButton>
                )}
              </Stack>
            );
          }}
          onClick={clickLista}
          fnRender={(item) =>
            `${getFechaString(item.fecha)} ${item.estado} ${
              item.cantidadProcesada
            }`
          }
          items={data}
        />
      </Grid>
      <NuevaRespuestaBanco
        open={openNew}
        callbackSuccess={successNew}
        setOpen={setOpenNew}
        idDebito={idDebito}
      />
      <QueryApi callbackSuccess={successQuery} dataConsulta={dataConsulta} />
    </Grid>
  );
}
