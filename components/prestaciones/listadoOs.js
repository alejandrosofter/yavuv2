import ColeccionTable from "@components/forms/coleccionTable";
import DialogContenido from "@components/forms/dialogContenido";
import ImpresionDialog from "@components/forms/impresion";
import NuevoGenerico from "@components/NuevoGenerico2";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import PerfilSocio from "@components/socios/perfilSocio";
import { getModUsuario } from "@helpers/db";
import { formatMoney } from "@helpers/numbers";
import Form from "./_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";
import {
  Grid,
  Typography,
  Button,
  Icon,
  Menu,
  List,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
} from "@mui/material";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
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

  const callbackclick = (data) => {
    console.log(data);
  };
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
    console.log(inscripto);
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
    console.log(inscriptos);
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
