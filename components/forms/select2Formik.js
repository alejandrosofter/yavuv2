import React, { useState, useEffect } from "react";
import { ErrorMessage, Field } from "formik";

import { FormControl, Typography } from "@mui/material";
import Select2 from "react-select";
import { getItemArray } from "@helpers/arrays";
const SelectFormik = ({
  label,
  campo,
  lista,
  disabled,
  campoLabel,
  campoId,
  callbackchange,
  extraData,
  multiple,
}) => {
  const [valor, setValor] = useState();
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
      <Field type="hidden" name={`label_${campo}`} id={`label_${campo}`} />
      <Field label={label} name={campo} id={campo}>
        {(props) => {
          if (multiple) {
            if (valor !== props.field.value) {
              setValor(props.field.value);
            }
          } else if (valor?.value !== props.field.value) {
            const itemArray = getItemArray({
              data: lista,
              valor: props.field.value,
            });

            if (itemArray) {
              const item = {
                label:
                  typeof campoLabel === "function"
                    ? campoLabel(itemArray)
                    : itemArray[campoLabel],
                value: itemArray[campoId],
              };
              setValor(item);
              if (callbackchange) callbackchange(item, itemArray);
            } else {
              setValor(null);
            }
          }

          const handleChange = (item) => {
            const campoLabel =
              campo.indexOf(".") === -1
                ? `label_${campo}`
                : campo.replace(".", ".label_");
            if (multiple) {
              props.form.setFieldValue(
                `where_${campo}`,
                item.map((i) => i.value)
              );
              props.form.setFieldValue(campo, item);
              props.form.setFieldValue(
                campoLabel,
                item.map((item) => item.label).join(",")
              );
              setValor(item);
              if (callbackchange) callbackchange(item);
            } else {
              const registro = getItemArray({
                data: lista,
                valor: item?.value,
                campoId: "id",
              });
              setValor(item);
              props.form.setFieldValue(campo, item?.value);

              props.form.setFieldValue(campoLabel, item?.label);
              if (extraData)
                extraData.forEach((field) => {
                  props.form.setFieldValue(
                    `${campo}_${field}`,
                    registro?.[field]
                  );
                });

              if (callbackchange) callbackchange(item, registro);
            }
          };

          return (
            <>
              <Select2
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                isDisabled={disabled}
                styles={{
                  ///.....
                  menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  ///.....
                }}
                id={`${campo}`}
                // defaultValue={props.form.values[campo]}
                defaultValue={
                  props.form.values
                    ? datos.filter(
                        (option) => option.value === props.form.values[campo]
                      )[0]
                    : null
                }
                label={`${label}`}
                isClearable={true}
                value={valor}
                isMulti={multiple}
                options={datos}
                placeholder={label}
                onChange={handleChange}
              />
              <Typography variant="caption" color="error">
                {props.meta?.error}
              </Typography>
            </>
          );
        }}
      </Field>
    </FormControl>
  );
};

export default SelectFormik;
