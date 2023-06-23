import { useEffect, useState } from "react";
import Select2 from "react-select";
import { getItemArray } from "@helpers/arrays";
export default function Select2Simple({
  label,
  lista,
  multiple,
  sx,
  campoId,
  callbackchange,
  defaultValue,
  value,
  campoLabel,
}) {
  const [valor, setValor] = useState(value);
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    const aux = lista?.map((item) => {
      return {
        label:
          typeof campoLabel === "function"
            ? campoLabel(item)
            : item[campoLabel],
        value: item[campoId],
      };
    });
    setDatos(aux);
  }, [lista]);
  if (!lista) return "cargando";

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
      sx={sx}
      styles={{
        ///.....
        menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
        menu: (provided) => ({ ...provided, zIndex: 9999 }),
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? "white" : "black",
        }),

        ///.....
      }}
      id={`${label}`}
      // defaultValue={props.form.values[campo]}
      defaultValue={
        defaultValue
          ? {
              label:
                typeof campoLabel === "function"
                  ? campoLabel(defaultValue)
                  : defaultValue[campoLabel],
              value: defaultValue[campoId],
            }
          : value
      }
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
