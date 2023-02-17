import React, { useState, useEffect } from "react";
import { Field } from "formik";
import {
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  Typography,
} from "@mui/material";

import { getItemArray, getItemArrayKey } from "@helpers/arrays";
import { fuego } from "@nandorojo/swr-firestore";
import Select from "@components/forms/select";
import DialogContenido from "@components/forms/dialogContenido";
import ListaSimple from "@components/forms/listaSimple";
import SelectFechaSimple from "@components/forms/selectorFechaSimple";
import { getFechaString } from "@helpers/dates";

import moment from "moment";
import { extendMoment } from "moment-range";
const SelectTurno = ({
  label,
  campo,
  callbackchange,
  consultorio,
  tipoTurno,
}) => {
  const [horarios, setHorarios] = useState([]);
  const [fechaBusca, setFechaBusca] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 1
    )
  );

  const [openTurnosDisponibles, setOpenTurnosDisponibles] = useState(false);

  const buscaTurno = () => {
    setOpenTurnosDisponibles(true);
    // setHorariosDisponibles(new Date(),tipoTurno)
  };
  const cambiaFecha = (value) => {
    setHorarios([]);
    setFechaBusca(value);
  };
  const buscarTurnos = () => {
    setHorariosDisponibles(tipoTurno);
  };

  //esta funcion recibe una fecha y devuelve 2 fechas que son desde que comienza el dia hasta que termina
  const getFechaDesde = (fecha) => {
    const fechaAux = new Date(fecha);
    fechaAux.setHours(0, 0, 0, 0);
    return fechaAux;
  };
  const getFechaHasta = (fecha) => {
    const fechaAux = new Date(fecha);
    fechaAux.setHours(24, 0, 0, 0);
    return fechaAux;
  };
  const sonFechasIguales = (fecha1, fecha2) => {
    return fecha1.getTime() === fecha2.getTime();
  };
  const mezclaHorariosOcupados = (horariosDisponibles, turnosOcupados) => {
    for (let i in horariosDisponibles) {
      let horario = horariosDisponibles[i];
      for (let j in turnosOcupados) {
        let turno = turnosOcupados[j];
        // ,horario.value.toDate())
        //02974062020
        // devuser1 desarrollosx santiagot@itcsoluciones.com soporte@it
        if (
          sonFechasIguales(
            new Date(turno.fechaTurno.seconds * 1000),
            horario.value.toDate()
          )
        ) {
          horariosDisponibles[i].disabled = true;
          horariosDisponibles[i].turnoOcupado = turno;
        }
      }
    }
    return horariosDisponibles;
  };

  const setHorariosDisponibles = async (tipoTurno) => {
    const fechaHasta = getFechaHasta(fechaBusca);
    const fechaDesde = getFechaDesde(fechaBusca);

    const refTurnosOcupados = await fuego.db
      .collection("turnos")
      .where("idUsuario", "==", fuego.auth().currentUser.uid)
      .where("tipoTurno", "==", tipoTurno.id)
      .where("fechaTurno", ">=", fechaDesde)
      .where("fechaTurno", "<", fechaHasta)
      .get();

    let arrTurnosOcupados = [];
    refTurnosOcupados.forEach((turno) => arrTurnosOcupados.push(turno.data()));

    if (tipoTurno && consultorio) {
      const fecha =
        "seconds" in fechaBusca ? fechaBusca.seconds * 1000 : fechaBusca;

      let horariosDisponibles = [];
      const momentRange = extendMoment(moment);
      // const CADA_MINUTOS = consultorio.duracion;

      for (let i in consultorio.horarios) {
        let horario = consultorio.horarios[i];
        //
        if (horario.tipoTurno === tipoTurno.id) {
          const CADA_MINUTOS = horario.duracion
            ? horario.duracion
            : consultorio.duracion;
          const desde = new Date(fecha);
          const hasta = new Date(fecha);
          desde.setHours(
            horario.desde.split(":")[0],
            horario.desde.split(":")[1],
            0
          );
          hasta.setHours(
            horario.hasta.split(":")[0],
            horario.hasta.split(":")[1],
            0
          );

          const range = momentRange.range(desde, hasta);

          const lista = Array.from(
            range.by("minutes", { step: CADA_MINUTOS })
          ).map((date) => ({
            label: date.format("HH:mm"),
            value: date,
            duracion: CADA_MINUTOS,
          }));

          horariosDisponibles = horariosDisponibles.concat(lista);
        }
      }
      horariosDisponibles = mezclaHorariosOcupados(
        horariosDisponibles,
        arrTurnosOcupados
      );
      setHorarios(horariosDisponibles);
    }
  };
  return (
    <FormControl fullWidth>
      <Field type="hidden" name={`label_${campo}`} id={`label_${campo}`} />
      <Field label={label} name={campo} id={campo}>
        {(props) => {
          const handleChange = (item) => {
            setOpenTurnosDisponibles(false);
            props.form.setFieldValue(campo, item.value.toDate()); //VIENE OBJ MOMENT
            props.form.setFieldValue("duracion", item.duracion);
            if (callbackchange) callbackchange(item);
          };
          return (
            <Grid container>
              <Typography variant="caption" style={{ marginTop: -5 }}>
                {label}
              </Typography>
              <Grid>
                <Button
                  fullWidth
                  disabled={!(consultorio && tipoTurno)}
                  onClick={buscaTurno}
                >
                  {!props.field.value && <Icon className="fas fa-search" />}
                  {props.field.value
                    ? getFechaString(props.field.value, "DD/MM/YY HH:mm")
                    : "seleccione"}
                </Button>
              </Grid>
              <DialogContenido
                fullWidth={true}
                maxWidth="sm"
                open={openTurnosDisponibles}
                setOpen={setOpenTurnosDisponibles}
                titulo="Turnos DISPONIBLES"
              >
                <Grid container>
                  <Grid item md={3}>
                    {" "}
                    <SelectFechaSimple callbackChange={cambiaFecha} />{" "}
                  </Grid>
                  <Grid sx={{ pl: 2 }} item md={2}>
                    <Button onClick={buscarTurnos}>
                      <Icon className="fas fa-search" /> Buscar
                    </Button>
                  </Grid>
                  <Grid item md={12}>
                    <ListaSimple
                      onClick={handleChange}
                      items={horarios}
                      campoId="value"
                      fnRender={(item) =>
                        item.disabled
                          ? `${item.label} OCUPADO ${item.turnoOcupado.label_paciente}`
                          : item.label
                      }
                    />
                  </Grid>
                </Grid>
              </DialogContenido>
            </Grid>
          );
        }}
      </Field>
    </FormControl>
  );
};

export default SelectTurno;
