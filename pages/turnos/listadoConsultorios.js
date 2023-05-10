import { Grid, Typography } from "@mui/material";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import ConsultorioTurnos from "./consultorioTurnos";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import CalendarioTurnos from "./calendarioTurnos";
import NavegadorConsultorios from "./navegadorConsultorios";
import { UseStorage } from "@hooks/useStorage";
export default function ListadoConsultorios({ mod }) {
  const { data } = useCollection("consultorios", {
    where: ["idUsuario", "==", fuego.auth().currentUser?.uid],
  });
  const [checks, setChecks] = UseStorage("checksConsultorios", []);
  const [fechaBusca, setFechaBusca] = useState(new Date());
  const handleChange = (item) => {
    if (item instanceof DateObject) setFechaBusca(item.toDate());
  };
  return (
    <Grid spacing={2} container>
      <Grid md={2} item>
        <CalendarioTurnos fechaBusca={fechaBusca} onChange={handleChange} />
      </Grid>
      <Grid md={10} item>
        <Typography variant="h6" gutterBottom>
          Consultorios
        </Typography>
        <NavegadorConsultorios
          checks={checks}
          setChecks={setChecks}
          sx={{ lp: 2 }}
          consultorios={data}
        />
      </Grid>
      <Typography sx={{ p: 2 }} variant="h6" gutterBottom>
        Turneras
      </Typography>
      <Grid container>
        {data
          ? data.map((consultorio, index) => (
              <ConsultorioTurnos
                muestra={checks.includes(consultorio.id)}
                fechaBusca={fechaBusca}
                consultorio={consultorio}
                key={index}
                mod={mod}
              />
            ))
          : ""}
      </Grid>
    </Grid>
  );
}
