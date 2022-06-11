import { useState } from "react";
import Select2 from "react-select";
import { getItemArray } from "@helpers/arrays";
export default function Select2Simple({
  label,
  lista,
  multiple,
  campoId,
  callbackchange,
  value,
  campoLabel,
}) {
  const [valor, setValor] = useState(value);
  if (!lista) return "cargando";
  const datos = lista.map((item) => {
    return {
      label:
        typeof campoLabel === "function" ? campoLabel(item) : item[campoLabel],
      value: item[campoId],
    };
  });
  const handleChange = (item) => {
    if (multiple) {
      setValor(item);
      if (callbackchange) callbackchange(item);
    } else {
      const registro = getItemArray({
        data: lista,
        valor: item?.value,
        campoId: "id",
      });
      setValor(item);
      if (callbackchange) callbackchange(item, registro);
    }
  };
  return (
    <Select2
      //   menuPortalTarget={document.body}
      menuPosition={"fixed"}
      styles={{
        ///.....
        menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
        menu: (provided) => ({ ...provided, zIndex: 9999 }),
        ///.....
      }}
      id={`${label}`}
      // defaultValue={props.form.values[campo]}
      defaultValue={value}
      label={`${label}`}
      isClearable={true}
      value={valor}
      isMulti={multiple}
      options={datos}
      placeholder={label}
      onChange={handleChange}
    />
  );
}
