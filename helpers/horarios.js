import moment from "moment";
import { fuego } from "@nandorojo/swr-firestore";
import { extendMoment } from "moment-range";
import { getFechaFormik } from "./dates";

const correspondeAlDia = ({ fechaBusca, horario }) => {
  const dia = fechaBusca.getDay();
  const diasCoincide = horario.dias
    .map((dia) => (dia.value === fechaBusca.getDay() ? 1 : 0))
    .reduce((a, b) => a + b, 0);
  return diasCoincide > 0;
};
export function getHorariosDisponibles({ horarios, fechaBusca }) {
  let horariosDisponibles = [];
  const desde = new Date(fechaBusca);
  const hasta = new Date(fechaBusca);
  const momentRange = extendMoment(moment);
  for (let i in horarios) {
    let horario = horarios[i];
    if (correspondeAlDia({ fechaBusca, horario })) {
      //   console.log(`corresponde al dia ${fechaBusca.getDay()}`);
      const CADA_MINUTOS = horario.duracion
        ? horario.duracion
        : consultorio.duracion;

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

      const lista = Array.from(range.by("minutes", { step: CADA_MINUTOS })).map(
        (date) => ({
          label: date.format("HH:mm"),
          value: date,
          duracion: CADA_MINUTOS,
          estado: "DISPONIBLE",
        })
      );

      horariosDisponibles = horariosDisponibles.concat(lista);
    }
  }
  return horariosDisponibles;
}
const processData = ({ data, consultorio, fechaBusca }) => {
  let salida = [];

  data.forEach((doc) => {
    salida.push(doc.data());
  });
  // console.log(salida);
  return salida;
};
export async function getHorariosDia({ fechaBusca, consultorio }) {
  const data = await fuego.db
    .collection("turnos_contadorDisponibilidad")
    .where("idConsultorio", "==", consultorio.id)
    .where("anio", "==", fechaBusca.getFullYear())
    .where("mes", "==", fechaBusca.getMonth() + 1)
    .where("dia", "==", fechaBusca.getDate())
    // .where("idUsuario", "==", fuego.auth().currentUser?.uid)
    .get();

  return processData({ data, consultorio, fechaBusca });
}
export async function getHorariosMes({ fechaBusca, consultorio }) {
  console.log(
    `fechaBusca: ${fechaBusca.getFullYear()} mes ${
      fechaBusca.getMonth() + 1
    } consultorio: ${consultorio.id}`
  );
  const data = await fuego.db
    .collection("turnos_contadorDisponibilidad")
    .where("idConsultorio", "==", consultorio.id)
    .where("anio", "==", fechaBusca.getFullYear())
    .where("mes", "==", fechaBusca.getMonth() + 1)
    // .where("idUsuario", "==", fuego.auth().currentUser?.uid)
    .get();

  return processData({ data, consultorio, fechaBusca });
}
const sonFechasIguales = (fecha1, fecha2, formato = "Y-M-d HH:mm") => {
  const d1 = moment(fecha1);
  const d2 = moment(fecha2);
  // console.log(`${d1.format(formato)} == ${d2.format(formato)}`);
  return d1.format(formato) == d2.format(formato);
};
export { sonFechasIguales };
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
      //   console.log("son iguales");
      // auxHorario.disabled = true;
      auxHorario.turnoOcupado = turno;
      auxHorario.estado = "OCUPADO";
    }
  }
  return auxHorario;
};

export async function getTurnosOcupados({ consultorio, fechaBusca }) {
  const fechaDesde = moment(fechaBusca);
  const fechaHasta = moment(fechaBusca).add(1, "days");
  //   console.log(`BUSCANDO TURNOS OCUPADOS PARA ${fechaBusca}`);
  let arrTurnosOcupados = [];
  if (fechaDesde.isValid() && fechaHasta.isValid()) {
    const refTurnosOcupados = await fuego.db
      .collection("turnos")
      .where("idUsuario", "==", fuego.auth().currentUser?.uid)
      .where("consultorio", "==", consultorio.id)
      .where("fechaTurno", ">=", fechaDesde.toDate())
      .where("fechaTurno", "<=", fechaHasta.toDate())
      .get();

    refTurnosOcupados.forEach((turno) => arrTurnosOcupados.push(turno.data()));
  } else {
    console.error(`fecha invalida d:${fechaDesde} h:${fechaHasta}`);
  }

  return arrTurnosOcupados;
}
