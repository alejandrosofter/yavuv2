import { Grid, Typography } from "@mui/material";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import ConsultorioTurnos from "./consultorioTurnos";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import CalendarioTurnos from "./calendarioTurnos";
export default function ListadoConsultorios({ mod }) {
  const { data } = useCollection("consultorios", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  const [fechaBusca, setFechaBusca] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 1
    )
  );
  const handleChange = (item) => {
    console.log(item);
    if (item instanceof DateObject) setFechaBusca(item.toDate());
  };
  return (
    <Grid container>
      <Grid md={12} item>
        <CalendarioTurnos value={fechaBusca} onChange={handleChange} />
      </Grid>
      {data
        ? data.map((consultorio, index) => (
            <ConsultorioTurnos
              fechaBusca={fechaBusca}
              consultorio={consultorio}
              key={index}
              mod={mod}
            />
          ))
        : ""}
    </Grid>
  );
}
