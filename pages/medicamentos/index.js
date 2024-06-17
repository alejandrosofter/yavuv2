import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import Modelo, { valoresIniciales } from "@modelos/ModeloMedicamentos";

import Form from "@components/medicamentos/_form";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import { getWherePermiso } from "@hooks/useUser";
import { Grid, Typography } from "@mui/material";

export default function PageMedicamentos({ open, setOpen, onSelect }) {
  const callbackSuccess = (data) => {
    setOpen(false);
    if (onsuccess) onsuccess(data);
  };
  const order = "nombre";
  const columns = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 250,
    },

    {
      accessorKey: "label_idPosologia",
      header: "Posologia",
      size: 120,
    },
    {
      accessorKey: "nombreGenerico",
      header: "Generico",
      size: 120,
    },
    {
      accessorKey: "presentacion",
      header: "Presentacion",
      size: 120,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 120,
    },
  ];

  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-check",
    //   label: "Seleccionar",
    //   fn: (row) => {
    //     if (onSelect) onSelect(row);
    //     setOpen(false);
    //   },
    // },
  ];
  const onCreateSuccess = (data, res) => {};
  return (
    <Grid container>
      <ABMColeccion2
        coleccion={`medicamentos`}
        columns={columns}
        initialState={{ showColumnFilters: true }}
        acciones={acciones}
        order={["nombre", "asc"]}
        maxWidth="md"
        rowsPerPage={100}
        hidePaginador={true}
        labelNuevo={"nuevo medicamento"}
        callbackSuccessNew={onCreateSuccess}
        where={getWherePermiso("medicamentos")}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{}}
        titulo={`MEDICAMENTOS`}
        Form={Form}
      />
    </Grid>
  );
}
