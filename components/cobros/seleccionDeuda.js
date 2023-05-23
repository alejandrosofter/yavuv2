import {
  Grid,
  Icon,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material/";
import Badge from "@mui/material/Badge";

import * as React from "react";
import { useEffect, useState } from "react";

import { fuego } from "@nandorojo/swr-firestore";
import DialogContenido from "@components/forms/dialogContenido";
import CheckListFormik from "@components/forms/checkListFormik";
import { getFechaString } from "@helpers/dates";
import TooltipHtml from "@components/forms/tooltipHtml";
import randomId from "random-id";
export default function Modulo({
  cliente,
  enabled,
  fnChange,
  abre,
  coleccionClientes = "socios",
}) {
  const [deudaSocio, setDeudaSocio] = useState([]);
  const [deudaSeleccion, setDeudaSeleccion] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (cliente) buscarDeuda(cliente);
  }, [cliente]);
  useEffect(() => {
    if (abre) setOpen(true);
  }, [abre]);
  const getWhereFamilares = async (socio, idSocioPrimario) => {
    let wheres = [idSocioPrimario];
    const refSocio = await fuego.db
      .collection(coleccionClientes)
      .doc(socio.objectID)
      .get()
      .then((doc) => doc.data());

    refSocio.familiares?.forEach(async (familiar) => {
      wheres.push(familiar.socio);
    });
    return wheres;
  };
  const buscarDeuda = async (cliente) => {
    if (cliente) {
      // const arrSocios = await getWhereFamilares(cliente, cliente.objectID);
      fuego.db
        .collection(`${coleccionClientes}/${cliente.objectID}/deudas`)

        .where("estado", "==", "PENDIENTE")
        .get()
        .then((refDeuda) => {
          let arr = [];
          refDeuda.forEach((docDeuda) => {
            arr.push(docDeuda);
          });
          if (arr.length > 0) setOpen(true);
          setDeudaSocio(arr);
        });
    }
  };

  if (!deudaSocio) return "cargando deuda";
  const cambiaItems = (items) => {
    setDeudaSeleccion(items);
    // if (fnChange) fnChange(items);
  };
  const clickAgregar = () => {
    fnChange(deudaSeleccion);
    setOpen(false);
  };
  const fnItem = (item) => {
    const id = randomId(7);
    return {
      ...item.data(),
      _id: item.id ? item.id : id,
      id: item.id ? item.id : id,
      label: fnLabel(item.data()),
    };
  };
  const clickAgregarTodo = () => {
    fnChange(deudaSocio.map(fnItem));
    setOpen(false);
  };
  const fnLabel = (item) => {
    const bonif = Number(
      item.importeBonificacion ? item.importeBonificacion : 0
    );
    const importe = (item.importe * item.cantidad - bonif).toFixed(2);
    const hijo = item.hijo
      ? ` (${item.hijo.apellido.toUpperCase()} ${item.hijo.nombre})`
      : "";
    return `${getFechaString(item.fechaVto)} - ${
      item.label_idProducto
    } ${hijo} $${importe} `;
  };
  return (
    <>
      <IconButton
        disabled={!enabled}
        variant="outlined"
        color="primary"
        className="fas fa-search-dollar"
        onClick={() => setOpen(true)}
      />

      <DialogContenido
        titulo="DEUDAS DEL SOCIO"
        fullWidth={true}
        maxWidth="sm"
        open={open}
        setOpen={setOpen}
      >
        <Grid container>
          <Grid item sx={{ p: 2 }} xs={12}>
            <Typography variant="body1">
              Selecciona la deuda que le quieras liquidar al socio o bien puedes
              agregar todo sin seleccionar con el boton inferior (naranja).
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CheckListFormik
              campo="seleccionItemsDeuda"
              callbackchange={cambiaItems}
              fnTransformItem={fnItem}
              lista={deudaSocio}
              campoLabel={fnLabel}
              campoId="id"
            />
          </Grid>
          <Grid container sx={{ p: 3 }} spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={clickAgregar}
              >
                <Icon className="fas fa-plus" /> Agregar Seleccion
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                onClick={clickAgregarTodo}
              >
                <Icon className="fas fa-plus" /> Agregar Todo
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContenido>
    </>
  );
}
