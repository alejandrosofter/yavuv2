import { Button, Grid, Icon, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DialogContenido from "@components/forms/dialogContenido";
import { useState } from "react";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import { getWherePermiso } from "@hooks/useUser";
import { getFechaString } from "@helpers/dates";
import ModeloTareas, { valoresIniciales } from "@modelos/ModeloTareas";
import Form from "../tareas/_form";
import moment from "moment";
import { useEffect } from "react";
//import collection nandorojo
import { fuego } from "@nandorojo/swr-firestore";
import ColeccionTable from "@components/forms/coleccionTable";
import ColeccionTable2 from "@components/forms/collectionTable2";
import ListaSimple from "@components/forms/listaSimple";
export default function TareasWhatsapp({ fechaBusca }) {
  const [open, setOpen] = useState(false);
  const [dataTareas, setDataTarea] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  useEffect(() => {
    if (fechaBusca) search(fechaBusca);
  }, [fechaBusca]);
  useEffect(() => {
    searchItems();
  }, [dataTareas]);
  const searchItems = () => {
    console.log(`search items`, dataTareas);
    for (let i = 0; i < dataTareas.length; i++) {
      fuego.db
        .collection(`tareas/${dataTareas[i].id}/items`)
        .get()
        .then((querySnapshot) => {
          let data = [];
          console.log(`size ${querySnapshot.size}`);
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });

          setDataItems(data);
        });
    }
  };
  const getIcono = (data) => {
    if (data?.estaConfirmado) {
      return (
        <Icon
          title="Turno CONFIRMADO por paciente whatsapp"
          sx={{ color: "green" }}
          className="fas fa-check-circle"
        />
      );
    }
    if (data?.estaSuspendido)
      return (
        <Icon
          title="Turno en SUSPENDIDO para confirmar/suspender"
          sx={{ color: "red" }}
          className="fas fa-times-circle"
        />
      );
    //return time wait icon
    return (
      <Icon
        title="Turno en ESPERA por paciente whatsapp"
        sx={{ color: "gray" }}
        className="fas fa-hourglass-half"
      />
    );
  };
  const search = (fechaBusca) => {
    //search in database firebase
    const fechaDesde = moment(new Date(fechaBusca)).startOf("day");
    const fechaHasta = moment(fechaDesde).add(1, "days");
    setDataItems([]);

    const idUsuario = fuego.auth().currentUser?.uid;
    if (!idUsuario) return;
    fuego.db
      .collection("tareas")
      .where("idUsuario", "==", idUsuario)
      .where("fechaBusca", ">=", fechaDesde.toDate())
      .where("fechaBusca", "<=", fechaHasta.toDate())
      .get()
      .then((querySnapshot) => {
        let data = [];
        console.log(`size tarea ${querySnapshot.size}`);
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setDataTarea(data);
      });
  };
  const acciones = [
    {
      // esFuncion: true,
      // icono: "fas fa-file-medical",
      // label: "Prestaciones",
      // fn: (row) => {
      //   setSeleccion(row);
      //   setOpen(true);
      // },
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={() => setOpen(true)}>
          <WhatsAppIcon /> Notificaciones ({dataItems.length})
        </Button>
      </Grid>
      <DialogContenido
        maxWidth={"sm"}
        fullWidth={true}
        open={open}
        setOpen={setOpen}
        titulo={
          <Typography variant="h4">
            <WhatsAppIcon /> Notificaciones
          </Typography>
        }
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="caption">
              {dataItems.length == 0
                ? `No se realizo ninguna notificacion!`
                : ``}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ListaSimple
              items={dataItems}
              fnRender={(item) => (
                <>
                  <Typography variant="h6">
                    {getIcono(item)} {item.data?.turno?.label_paciente}{" "}
                  </Typography>
                  <Typography variant="caption">
                    {item.data.mensaje}{" "}
                  </Typography>
                  <Typography>
                    <WhatsAppIcon /> {item.nroTelefono}{" "}
                  </Typography>
                </>
              )}
            />
          </Grid>
        </Grid>
      </DialogContenido>
    </Grid>
  );
}
