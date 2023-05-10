import { UseStorage } from "@hooks/useStorage";
import { ButtonGroup, Button, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";

export default function NavegadorConsultorios({
  consultorios,
  checks,
  setChecks,
}) {
  const cambia = (consultorio, e) => {
    let aux = [...checks];
    if (e.target.checked) aux.push(consultorio.id);
    else
      aux = aux.filter(function (x) {
        return x !== consultorio.id;
      });
    // ;
    setChecks(aux);
  };
  //   ;
  return (
    <ButtonGroup
      size="small"
      variant="contained"
      aria-label="outlined primary button group"
    >
      {consultorios?.map((consultorio, index) => (
        <FormControlLabel
          key={index}
          control={
            <Switch
              onChange={cambia.bind(this, consultorio)}
              defaultChecked={checks.includes(consultorio.id)}
              //   checked={checks.indexOf(consultorio.id) !== -1}
            />
          }
          label={consultorio.nombreCorto}
        />
      ))}
    </ButtonGroup>
  );
}
