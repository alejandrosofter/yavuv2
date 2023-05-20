import React, { useState, useEffect } from "react";
import { Field } from "formik";

import { FormControl, Icon, Tooltip } from "@mui/material";
import Select2 from "react-select";
import { getItemArray } from "@helpers/arrays";
const InfoPaciente = ({ label, campo, lista, campoLabel, campoId }) => {
  if (!lista) return "cargando";
  const datos = lista.map((item) => {
    return {
      label:
        typeof campoLabel === "function" ? campoLabel(item) : item[campoLabel],
      value: item[campoId],
    };
  });

  return (
    <FormControl fullWidth>
      <Field label={label} name={campo} id={campo}>
        {(props) => {
          const dataPaciente = getItemArray({
            data: lista,
            valor: props.field.value,
          });
          if (!dataPaciente) return "";
          return (
            <Tooltip
              title={`Tel. ${dataPaciente.telefono} - DNI ${dataPaciente.dni} - Obra social ${dataPaciente.label_obraSocial}`}
            >
              <Icon className="fas fa-info" />
            </Tooltip>
          );
        }}
      </Field>
    </FormControl>
  );
};

export default InfoPaciente;
