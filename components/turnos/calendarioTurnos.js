import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import SelectConsultorio from "@components/consultorios/selectConsultorioSimple";
export default function CalendarioTurnos({ onChange, fechaBusca }) {
  const weekDays = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    setValue(fechaBusca);
  }, [fechaBusca]);
  const cambiaConsultorio = (consultorio) => {
    console.log(consultorio);
  };
  return (
    <DatePicker
      mapDays={({ date }) => {
        let color;

        if ([4, 5, 6, 7].includes(date.day)) color = "green";
        if ([11, 12, 13, 14].includes(date.day)) color = "red";

        if (color) return { className: "highlight highlight-" + color };
      }}
      weekDays={weekDays}
      value={value}
      onChange={onChange}
    >
      <SelectConsultorio callbackchange={cambiaConsultorio} />
    </DatePicker>
  );
}
