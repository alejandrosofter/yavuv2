import React, { useState, useEffect } from "react";
import NuevoTurno from "./nuevo";
import EditarTurno from "./editar";
import { porcentajeColor } from "@helpers/colores";
import {
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  Typography,
} from "@mui/material";
import { formatPorcentual } from "@helpers/numbers";
import { getItemArray, getItemArrayKey } from "@helpers/arrays";
import { fuego } from "@nandorojo/swr-firestore";
import Select from "@components/forms/select";
import DialogContenido from "@components/forms/dialogContenido";
import ListaSimple from "@components/forms/listaSimple";
import SelectFechaSimple from "@components/forms/selectorFechaSimple";
import { getFechaString } from "@helpers/dates";

import moment from "moment";
import { extendMoment } from "moment-range";
import TitulosFormularios from "@components/forms/tituloFormularios";
import ItemTurno from "./itemTurno";
const ConsultorioTurnos = ({
  mod,
  fechaBusca,
  callbackchange,
  consultorio,
}) => {
  useEffect(() => {
    setHorariosDisponibles();
  }, [fechaBusca]);
  const [horarios, setHorarios] = useState([]);
  const [openNuevoTurno, setOpenNuevoTurno] = useState(false);
  const [openUpdateTurno, setOpenUpdateTurno] = useState(false);
  const [preData, setPredata] = useState();
  const [porcentualOcupado, setPorcentualOcupado] = useState(0);
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
    const d1 = moment(fecha1);
    const d2 = moment(fecha2);
    console.log(
      d1.format("Y-M-d HH:mm"),
      d2.format("Y-M-d HH:mm"),
      d1.format("Y-M-d HH:mm") == d2.format("Y-M-d HH:mm")
    );
    return d1.format("Y-M-d HH:mm") == d2.format("Y-M-d HH:mm");
  };
  const getHorario = ({ turnosOcupados, horario }) => {
    let auxHorario = horario;
    for (let j in turnosOcupados) {
      let turno = turnosOcupados[j];
      // console.log(new Date(turno.fechaTurno.seconds*1000),horario.value.toDate())
      //02974062020
      // devuser1 desarrollosx santiagot@itcsoluciones.com soporte@it
      if (
        sonFechasIguales(
          new Date(turno.fechaTurno.seconds * 1000),
          auxHorario.value.toDate()
        )
      ) {
        console.log("son iguales");
        // auxHorario.disabled = true;
        auxHorario.turnoOcupado = turno;
        auxHorario.estado = "OCUPADO";
      }
    }
    return auxHorario;
  };
  const handleNuevoTurno = () => {
    setOpenNuevoTurno(false);
    setHorariosDisponibles();
  };
  const mezclaHorariosOcupados = (horariosDisponibles, turnosOcupados) => {
    for (let i in horariosDisponibles) {
      const horario = getHorario({
        turnosOcupados,
        horario: horariosDisponibles[i],
      });
      horariosDisponibles[i] = horario;
    }
    const porcentual =
      (turnosOcupados.length * 100) / horariosDisponibles.length;
    setPorcentualOcupado(porcentual);
    return horariosDisponibles;
  };
  const handleChange = (item) => {
    console.log(item);
    const aux = {
      fechaTurno: item.value.toDate(),
      consultorio: consultorio.id,
      nombreConsultorio: consultorio.nombre,
    };
    setPredata(aux);
    setOpenNuevoTurno(true);
    if (callbackchange) callbackchange(item);
  };
  const setHorariosDisponibles = async () => {
    const fechaHasta = getFechaHasta(fechaBusca);
    const fechaDesde = getFechaDesde(fechaBusca);

    const refTurnosOcupados = await fuego.db
      .collection("turnos")
      .where("idUsuario", "==", fuego.auth().currentUser.uid)
      .where("consultorio", "==", consultorio.id)
      .where("fechaTurno", ">=", fechaDesde)
      .where("fechaTurno", "<", fechaHasta)
      .get();

    let arrTurnosOcupados = [];
    refTurnosOcupados.forEach((turno) => arrTurnosOcupados.push(turno.data()));

    if (consultorio) {
      const fecha =
        "seconds" in fechaBusca ? fechaBusca.seconds * 1000 : fechaBusca;

      let horariosDisponibles = [];
      const momentRange = extendMoment(moment);
      // const CADA_MINUTOS = consultorio.duracion;

      for (let i in consultorio.horarios) {
        let horario = consultorio.horarios[i];

        // if (horario.tipoTurno === tipoTurno.id) {
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
          estado: "DISPONIBLE",
        }));

        horariosDisponibles = horariosDisponibles.concat(lista);
        // console.log(horariosDisponibles);
        // }
      }
      horariosDisponibles = mezclaHorariosOcupados(
        horariosDisponibles,
        arrTurnosOcupados
      );
      setHorarios(horariosDisponibles);
    }
  };
  return (
    <Grid item md={3}>
      <TitulosFormularios
        titulo={consultorio.nombreCorto}
        subTitulo={`${formatPorcentual(porcentualOcupado, 0)}`}
        color={`${porcentajeColor(porcentualOcupado, true)}`}
      />
      <ListaSimple
        onClick={handleChange}
        items={horarios}
        campoId="value"
        fnRender={(item) => <ItemTurno item={item} consultorio={consultorio} />}
      />
      <DialogContenido
        fullWidth={true}
        maxWidth="md"
        open={openNuevoTurno}
        setOpen={setOpenNuevoTurno}
        titulo="Nuevo Turno"
      >
        <NuevoTurno
          titulo={getFechaString(preData?.fechaTurno, "DD/MM HH:mm")}
          subTitulo={`en ${consultorio.nombre}`}
          mod={mod}
          preData={preData}
          callbackSuccess={handleNuevoTurno}
        />
      </DialogContenido>
      <DialogContenido
        fullWidth={true}
        maxWidth="md"
        open={openUpdateTurno}
        setOpen={setOpenUpdateTurno}
        titulo="Editar Turno"
      >
        <EditarTurno
          mod={mod}
          idItem={preData?.id}
          callbackSuccess={handleNuevoTurno}
        />
      </DialogContenido>
    </Grid>
  );
};

export default ConsultorioTurnos;
