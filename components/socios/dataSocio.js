import MuestraImagen from "@components/forms/muestraImagen";
import { capitalize } from "@helpers/Strings";
import { Typography, Grid, Stack, Button, Icon } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import Link from "next/link";
import ConfirmDialog from "@components/forms/confirmDialog";
import { useState } from "react";
export default function DataSocio({ dataSocio, mod, callbackdelete }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const borrarSocio = () => {
    fuego.db
      .collection("socios")
      .doc(dataSocio.id)
      .delete()
      .then(() => {
        setOpenConfirm(false);
        if (callbackdelete) callbackdelete();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const color = !dataSocio.sexo
    ? ""
    : dataSocio.sexo === "masculino"
    ? "blue"
    : "#ff00d4";
  if (!dataSocio) return "Sin Seleccion de Socio";
  return (
    <Grid sx={{ pl: 4 }} alignItems={`center`} container>
      <Grid item md={1}>
        <Stack alignItems={`center`}>
          <Typography variant="caption">{dataSocio.label_tipoSocio}</Typography>
          <MuestraImagen
            borderColor={dataSocio.estado === "ALTA" ? "grey.700" : "red"}
            border={3}
            w={70}
            h={70}
            pathImagen={dataSocio.foto}
          />
          <Typography variant="h5">
            {`${dataSocio.nroSocio}`.padStart(6, 0)}
          </Typography>
        </Stack>
      </Grid>
      <Grid item container md={7}>
        <Grid item>
          <Icon
            sx={{ color }}
            className={
              !dataSocio.sexo
                ? ""
                : dataSocio.sexo == "masculino"
                ? "fas fa-mars"
                : "fas fa-venus"
            }
          />
        </Grid>
        <Grid item md={11}>
          <Typography variant="h3">
            {`${dataSocio.apellido?.toUpperCase()} ${capitalize(
              dataSocio.nombre
            )}`}
          </Typography>
        </Grid>
        <Grid item container spacing={1} md={12}>
          <Grid item md={8}>
            <Link href={`/mod/${mod?.id}/editar/${dataSocio.id}`}>
              <Button variant="outlined" size="small" color="primary">
                <Icon
                  sx={{ mr: 1, fontSize: "small" }}
                  className="fas fa-pencil"
                />{" "}
                info personal
              </Button>
            </Link>
          </Grid>
          <Grid item md={4}>
            <Button
              onClick={() => setOpenConfirm(true)}
              variant="outlined"
              size="small"
              color="error"
            >
              <Icon
                sx={{ mr: 1, fontSize: "small" }}
                className="fas fa-trash"
              />{" "}
              borrar socio
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item alignItems="flex-start" direction="column" container md={3}>
        <Grid item>
          <Typography sx={{ fontWeight: "#29ab29", color }} variant="caption">
            {" "}
            {dataSocio.label_categoriaSocio}
          </Typography>
          <Typography variant="caption">
            {" "}
            - {dataSocio.label_tipoSocio}
          </Typography>
        </Grid>
        <Grid spacing={2} item>
          <Typography variant="caption">DNI: {dataSocio.dni}</Typography>
          <Typography variant="caption">
            {" "}
            EDAD: {dataSocio.edad} Años
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="caption">EMAIL: {dataSocio.email}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption">
            TEL: {dataSocio.telefonoMobil}
          </Typography>
        </Grid>
      </Grid>
      <ConfirmDialog
        mensaje="Al ACEPTAR esta opcion se borraran todos los datos de este socio (no bien su historial)"
        open={openConfirm}
        titulo="ATENCION: estas a punto de borrar el socio"
        setOpen={setOpenConfirm}
        callbacksuccess={borrarSocio}
      />
    </Grid>
  );
}
