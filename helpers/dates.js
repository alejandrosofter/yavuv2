import moment from "moment";
//import Timestamp from firestore

export function parseTimestamp(date) {
  return new Date();
}

export function getFechaString(fecha, format) {
  const formato = format ? format : "DD/MM/YY";

  if (!fecha) return "-";
  if (moment.isMoment(fecha)) {
    return fecha.format(formato);
  }
  if (moment.isDate(fecha)) {
    return moment(fecha).format(formato);
  }
  if (typeof fecha === "string") {
    if (moment.isDate(fecha))
      return `${moment(new Date(fecha)).format(formato)}`;
    return `${moment(new Date(fecha)).format(formato)}`;
  }
  if (typeof fecha === "number")
    return `${moment(new Date(fecha * 1000)).format(formato)}`;
  if (typeof fecha === "object") {
    if ("$date" in fecha)
      return `${moment(new Date(fecha.$date)).format(formato)}`;
    if ("seconds" in fecha)
      return `${moment(new Date(fecha.seconds * 1000)).format(formato)}`;
  }

  return "-";
}

export function getFechaFormik(fecha) {
  if (!fecha) return new Date();
  if (moment.isDate(fecha)) return new Date(fecha);
  if ("seconds" in fecha) return new Date(fecha.seconds * 1000);
  if ("$date" in fecha) return new Date(fecha.$date);
  return new Date();
}
export function getFechaDesde(fecha) {
  const fechaAux = new Date(fecha);
  fechaAux.setHours(0, 0, 0, 0);
  return fechaAux;
}

export function getFechaHasta(fecha) {
  const fechaAux = new Date(fecha);
  fechaAux.setHours(24, 0, 0, 0);
  return fechaAux;
}
export function getFechaDesdeMes(fecha) {
  const fechaAux = new Date(fecha);
  fechaAux.setHours(0, 0, 0, 0);
  return fechaAux;
}
export function getFechaHastaMes(fecha) {
  const fechaAux = new Date(fecha);
  fechaAux.setHours(24, 0, 0, 0);
  return fechaAux;
}
