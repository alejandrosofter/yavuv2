import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import { useState } from "react";
export default function Modulo({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();

  const [openEnviar, setOpenEnviar] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const [openDeudas, setOpenDeudas] = useState();
  const order = ["nombre", "asc"];

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 120,
    },
    {
      field: "label_idMod",
      headerName: "Modulo",
      width: 120,
    },
    {
      field: "campos",
      headerName: "Campos",
      width: 420,
      renderCell: (params) =>
        //return comma separated list of campos
        params.value
          .map(
            (campo) =>
              `${campo.nombreCampo} ${campo.condicion} (${campo.tipoDato})`
          )
          .join(", "),
    },
  ];

  let fnAcciones = {};
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        coleccion={mod.coleccion}
        titulo={mod.label}
        subTitulo=""
        icono={mod.icono}
        limit={10}
        mod={mod}
        acciones={mod.acciones}
        orderBy={order}
        columns={columns}
      />
    </>
  );
}
