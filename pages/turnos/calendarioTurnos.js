import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import SelectConsultorio from "@components/consultorios/selectConsultorioSimple";
import esp_ar from "@components/forms/multiDateReact/spanish";
import { getHorariosMes } from "@helpers/horarios";
import { porcentajeColor } from "@helpers/colores";
import { sonFechasIguales } from "@helpers/horarios";
import {} from "react-date-object/locales/gregorian_en";

import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
export default function CalendarioTurnos({ onChange, fechaBusca }) {
  const weekDays = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];
  const [value, setValue] = useState(new Date());
  const [arrDias, setArrDias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consultorioSelect, setConsultorioSelect] = useState();
  const handleClose = () => {
    setLoading(false);
  };
  useEffect(() => {
    setValue(fechaBusca);
  }, [fechaBusca]);
  useEffect(() => {
    consultarData();
  }, [value]);

  const consultarData = async (consultorio) => {
    setLoading(true);
    if (consultorio) await setDisponibilidadMes(consultorio);
    else await setDisponibilidadMes(consultorioSelect);
    setLoading(false);
  };
  const cambiaConsultorio = async (consultorio) => {
    setConsultorioSelect(consultorio);
    await consultarData(consultorio);
  };
  const cambiaMes = async (date) => {
    setValue(new Date(date));
  };

  const getDataDia = (date) => {
    for (let i = 0; i < arrDias.length; i++) {
      // ;
      if (
        sonFechasIguales(
          new Date(arrDias[i].fechaBusca.seconds * 1000),
          date,
          "YYYY-MM-DD"
        )
      ) {
        // ;
        return arrDias[i];
      }
    }
  };
  const getEstilo = (date) => {
    const dataDia = getDataDia(new Date(date));
    // ;
    let style = { color: "#000" };
    let title = `
    No esta seteado como un dia para dar turnos, para hacerlo debes ir a consultorios y editar los horarios`;
    if (dataDia) {
      if (dataDia.cantidadDisponibles === 0) return { style, title };
      if (dataDia.cantidadDisponibles > 0) {
        style.color = porcentajeColor(
          dataDia.porcentual ? dataDia.porcentual : 0,
          true
        );
        title = `${
          dataDia.cantidadDisponibles - dataDia.cantidadOcupados
        } disponibles`;
        return {
          title,
          style,
        };
      }
    }
    return {
      style,
      title,
    };
    // ;
  };
  const mapDays = ({ date }) => {
    return getEstilo(date);
  };
  const setDisponibilidadMes = async (consultorio) => {
    if (consultorio) {
      const fechaHasta = new Date(value.getFullYear(), value.getMonth() + 1, 0);
      const fechaDesde = new Date(value.getFullYear(), value.getMonth(), 1);

      let data = await getHorariosMes({
        fechaBusca: fechaDesde,
        consultorio,
      });
      setArrDias(data);
    }
  };
  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        Calendario de turnos
      </Typography>
      <DatePicker
        locale={esp_ar}
        mapDays={mapDays}
        format="dddd DD MMMM"
        formattingIgnoreList={["Date"]}
        // weekDays={weekDays}
        defaultValue={value}
        value={value}
        onChange={onChange}
        onMonthChange={cambiaMes}
        style={{
          backgroundColor: "aliceblue",
          height: "50px",
          width: "200px",
          fontSize: "20px",
          borderRadius: "10px",
          padding: "3px 10px",
        }}
      >
        <SelectConsultorio callbackchange={cambiaConsultorio} />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={false}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </DatePicker>
    </Stack>
  );
}
