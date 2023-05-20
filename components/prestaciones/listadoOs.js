import DialogContenido from "@components/forms/dialogContenido";

import { formatMoney } from "@helpers/numbers";
import Form from "../../components/prestaciones/_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloPrestaciones";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import ABMColeccion from "@components/forms/ABMcollection";
export default function PrestacionesListado({
  open,
  setOpen,
  obraSocial,
  mod,
}) {
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [dataSeleccion, setDataSeleccion] = useState();
  const [inscriptos, setInscriptos] = useState([]);

  const callbackclick = (data) => {};
  const changeData = (data) => {
    setInscriptos(data);
  };
  const columns = [
    {
      field: "codigoInterno",
      headerName: "Codigo",
      width: 110,
    },

    {
      field: "nombre",
      headerName: "Nombre",
      width: 550,
      renderCell: (params) =>
        `${
          params.row.nombreCorto ? params.row.nombreCorto : params.row.nombre
        }`,
    },
    {
      field: "importe",
      headerName: "Importe",
      width: 120,
      renderCell: (params) => formatMoney(params.value),
    },
  ];
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-pencil",
    //   label: "Editar",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenEditar(true);
    //   },
    // }
  ];
  const clickMenu = (inscripto) => {
    setDataSeleccion(inscripto);
  };
  const getCols = () => {
    let arr = [];
    for (let index = 1; index <= 31; index++)
      arr.push({ dia: `${index}`.padStart(2, "0") });

    return arr;
  };
  const imprimirIntegrantes = () => {
    setOpenImpresion(true);
    setDataImpresion({ inscriptos, colsDias: getCols() });
  };
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="lg"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        {obraSocial && (
          <Grid item xs={12}>
            <ABMColeccion
              coleccion={`obrasSociales/${obraSocial?.id}/prestaciones`}
              columns={columns}
              acciones={[]}
              order={["codigoInterno", "asc"]}
              rowsPerPage={100}
              hidePaginador={true}
              callbackclick={callbackclick}
              icono={"fas fa-users"}
              Modelo={Modelo}
              valoresIniciales={valoresIniciales}
              dataForm={{}}
              titulo={`PRESTACIONES`}
              Form={Form}
            />
          </Grid>
        )}
      </Grid>
    </DialogContenido>
  );
}
