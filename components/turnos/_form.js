import {
  Button,
  Grid,
  Icon,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Input from "../forms/input";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectPacientes from "../pacientes/selectPaciente";
import SelectConsultorio from "@components/consultorios/selectConsultorio";

import SelectTipoTurno from "./selectTipoTurno";

import { useEffect, useState } from "react";
import SelectTurno from "./selectTurno";

import SelectorFecha from "@components/forms/selectorFecha";
import SelectorFechaTime from "@components/forms/fechaTimeFormik";
import SelectCategoriaTurnos from "./selectCategoriaTurno";
import EliminarTurno from "./eliminarTurno";
import SwitchFormik from "@components/forms/switch";
export default function Form({ mod, setFieldValue, values, callbackElimina }) {
  const [tipoTurno, setTipoTurno] = useState();
  const [consultorio, setConsultorio] = useState();
  const cambiaTipo = (value, item) => {
    setTipoTurno(item);
    if (item) {
      setFieldValue("duracion", item.duracion ? item.duracion : "");
      setFieldValue("detalle", item.requerimiento ? item.requerimiento : "");
    } else {
      setFieldValue("duracion", "");
      setFieldValue("detalle", "");
    }
    // setHorariosDisponibles(values.fecha,item)
  };
  const cambiaConsultorio = (value, item) => {
    setConsultorio(item);
    // setHorariosDisponibles(values.fecha,tipoTurno)
  };
  const handleElimina = (res) => {
    if (callbackElimina) callbackElimina(res);
  };
  const cambiaPaciente = (valor, item) => {
    setFieldValue("emailNotifica", item.email);
  };
  return (
    <Grid container>
      <Grid sx={{ pt: 1, pb: 1 }} md={12} container rowSpacing={2} spacing={2}>
        <Grid sx={{ display: "none" }} item md={2}>
          <SelectorFecha label="Fecha Ingreso" campo="fecha" />
        </Grid>
        <Grid sx={{ display: "none" }} item md={2}>
          <SelectConsultorio callbackchange={cambiaConsultorio} />
        </Grid>
        <Grid sx={{ display: "none" }} item md={3}>
          <SelectTipoTurno callbackchange={cambiaTipo} mod={mod} />
        </Grid>
        <Grid sx={{ display: "none" }} item md={2}>
          <SelectorFechaTime
            disabled={true}
            label="Fecha Turno"
            campo="fechaTurno"
          />
        </Grid>

        <Grid item md={5}>
          <SelectPacientes callbackchange={cambiaPaciente} />
        </Grid>
        <Grid item md={5}>
          <SelectCategoriaTurnos callbackchange={cambiaTipo} mod={mod} />
        </Grid>
        <Grid item md={2}>
          <Input label="Duracion" campo="duracion" />
        </Grid>
        <Grid sx={{ display: "none" }} item md={2}>
          <SelectEstaticFormik
            items={["PENDIENTE", "ASISTE", "NO ASISTE"]}
            label="Estado"
            campo="estado"
          />
        </Grid>
        <Grid item md={7}>
          <Input label="Detalle" campo="detalle" />
        </Grid>
        <Grid item md={5}>
          <SwitchFormik label="Notificar" campo="notificar" />
          <Typography variant="caption">
            Deje seleccionado si quiere que se le notifique al paciente por
            cualquier cambio en el turno.
          </Typography>
        </Grid>
        <Grid sx={{ display: values.notificar ? "si" : "none" }} item md={7}>
          <Input label="Email Notifica" campo="emailNotifica" />
        </Grid>
      </Grid>
      {values.id && (
        <EliminarTurno callbacksuccess={handleElimina} idItem={values?.id} />
      )}
    </Grid>
  );
}
