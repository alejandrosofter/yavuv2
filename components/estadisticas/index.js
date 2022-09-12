import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { useState } from "react";
import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import { Grid, Typography } from "@mui/material";
import GraphEstadistica from "./graph";
import EditarEstadistica from "./editar";
import ConfirmDialog from "@components/forms/confirmDialog";
export default function Modulo({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();

  const [open, setOpen] = useState(false);
  const [openDialogo, setOpenDialogo] = useState(false);
  const [doc, setDoc] = useState(false);
  const parentData =
    localStorage.getItem("usermod") === fuego.auth().currentUser?.uid;
  const wheres = [
    parentData
      ? ["idUsuario", "==", localStorage.getItem("usermod")]
      : ["usermod", "==", fuego.auth().currentUser?.uid],
  ];
  const { deleteDocument } = useDocument(`estadisticas/${doc?.id}`);
  const { data: estadisticas } = useCollection(`estadisticas`, {
    wheres,
    listen: true,
  });
  const callbacksuccess = (data) => {
    setOpenDialogo(false);
    setOpen(false);
    console.log(`estadisticas/${doc?.id}`, doc);
    deleteDocument();
  };

  let fnAcciones = {
    aplicar: (data) => {
      setDataConsulta({ url: "/api/estadisticas/aplicar", data });
    },
  };

  if (!estadisticas || estadisticas.length === 0)
    return (
      <Grid spacing={2} container>
        <Grid item md={12}>
          <Typography variant="caption">
            Debes ingresar alguna estadistica!
          </Typography>{" "}
        </Grid>
      </Grid>
    );
  return (
    <Grid spacing={1} alignItems="center" container>
      {estadisticas.map((item) => (
        <Grid key={item.id} item md={item.size ? item.size : 4}>
          <GraphEstadistica
            acciones={[
              {
                icon: "fas fa-pencil",
                nombre: "Editar",
                fn: () => {
                  setOpen(true);
                  setDoc(item);
                },
              },
              {
                icon: "fas fa-trash",
                nombre: "Quitar",
                fn: () => {
                  setDoc(item);
                  setOpenDialogo(true);
                },
              },
            ]}
            estadistica={item}
          />
        </Grid>
      ))}
      <EditarEstadistica doc={doc} open={open} setOpen={setOpen} />
      <ConfirmDialog
        open={openDialogo}
        titulo="Confirmas?"
        mensaje={"Realmente deseas eliminar este registro?"}
        setOpen={setOpenDialogo}
        callbacksuccess={callbacksuccess}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
