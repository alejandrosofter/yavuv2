import React, { useState, useEffect } from "react";
import { Field } from "formik";

import { FormControl } from "@mui/material";

import ItemsModulo from "@components/forms/itemsModulo";

const DataGridFormikItems = ({
  label,
  campo,
  columns,
  icono,
  Modelo,
  valoresIniciales,
  FormularioItem,
  preData,
  mod,
  maxWidth = "md",
  onCreate,
  hideAgregar,
  triggerOpen = { state: false, timestamp: 0 },
}) => {
  return (
    <FormControl fullWidth>
      <Field label={label} name={campo} id={campo}>
        {(props) => {
          return (
            <div style={{ height: 300, width: "100%" }}>
              <ItemsModulo
                setFieldValue={props.form.setFieldValue}
                titulo={label}
                triggerOpen={triggerOpen}
                hideAgregar={hideAgregar}
                icono={icono}
                onCreate={onCreate}
                campo={campo}
                data={props.form.values[campo] ? props.form.values[campo] : []}
                modelo={Modelo}
                nombreModulo={label}
                fullWidth={true}
                maxWidth={maxWidth}
                textoEditar={`Puedes cambiar las acciones de esta accion:`}
                textoAgregar={`Ingrese los datos de la accion`}
                valoresIniciales={valoresIniciales}
                form={<FormularioItem mod={mod} {...preData} />}
                dataModulo={[]}
                columnas={columns}
              />
            </div>
          );
        }}
      </Field>
    </FormControl>
  );
};

export default DataGridFormikItems;
