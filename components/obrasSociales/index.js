import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloObrasSociales";
import PrestacionesListado from "@components/prestaciones/listadoOs";
import { useState } from "react";
import { getFechaString } from "@helpers/dates";
export default function Modulo({ mod }) {
  const [seleccion, setSeleccion] = useState(null);
  const [open, setOpen] = useState(false);
  const order = "nombre";
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 390,
    },
    {
      field: "lastUpdateNomencladores",
      headerName: "Ultima Actualizacion Presta.",
      width: 160,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 120,
    },
  ];

  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-file-medical",
      label: "Prestaciones",

      fn: (row) => {
        setSeleccion(row);
        setOpen(true);
      },
    },
  ];
  return (
    <>
      <ABMColeccion
        coleccion={`obrasSociales`}
        columns={columns}
        acciones={acciones}
        order={["nombre", "asc"]}
        maxWidth="lg"
        rowsPerPage={100}
        hidePaginador={true}
        // callbackclick={callbackclick}
        icono={"fas fa-users"}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{}}
        titulo={`OBRAS SOCIALES`}
        Form={Form}
      />
      <PrestacionesListado
        open={open}
        setOpen={setOpen}
        obraSocial={seleccion}
        mod={mod}
      />
    </>
  );
}
