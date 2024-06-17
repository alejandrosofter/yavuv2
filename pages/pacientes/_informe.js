import { IconButton, Stack, Icon, Grid } from "@mui/material";
import {
  useCollection,
  fuego,
  useCollectionGroup,
} from "@nandorojo/swr-firestore";
import { Fragment, useEffect, useState } from "react";
import TitulosFormularios from "@components/forms/tituloFormularios";
import { getItemObject } from "@helpers/arrays";
import { ColeccionTable } from "@components/forms/collectionTable2";
import { getFechaString } from "@helpers/dates";
import Link from "next/link";
import { getDetalleReceta } from "./fichaPaciente";

export default function InformePacientes({}) {
  const [dataPacientes, setDataPacientes] = useState([]);
  const [filtro, setFiltro] = useState({
    where: ["idUsuario", "==", fuego.auth().currentUser?.uid],
    orderBy: ["apellido", "desc"],
  });
  const { data, error } = useCollectionGroup(
    `recetas`,
    {
      // limit: 100,
      where: ["idUsuario", "==", fuego.auth().currentUser?.uid],
      orderBy: ["fecha", "desc"],
    },
    {}
  );

  useEffect(() => {
    if (data) {
      setDataPacientes(
        data.map((item) => {
          return { ...item, detalle: getDetalleReceta(item) };
        })
      );
    }
  }, [data]);
  const condiciones = [
    // {
    //   campo: "idUsuario",
    //   condicional: "==",
    //   field: fuego.auth().currentUser?.uid,
    // },
    // { campo: "idEntidad", condicional: "==", field: "idEntidad" },
    // { campo: "idCentroCosto", condicional: "==", field: "idCentroCosto" },
  ];
  const getWhere = (item, valores) => {
    const valor = getItemObject({ data: valores, keyBusca: item.campo });

    if (!valor || valor === "") return null;
    return [item.field, item.condicional, valor];
  };
  const buscar = (valores) => {
    const where = condiciones
      .map((item) => getWhere(item, valores))
      .filter((n) => n);

    where.push(["idUsuario", "==", fuego.auth().currentUser?.uid]);

    setFiltro({ where, orderBy: ["fecha", "desc"] });
  };

  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-user",
    //   label: "Ir a Paciente",
    //   fn: (row) => {
    //     console.log(row);
    //   },
    // },
  ];

  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 50,
      Cell: ({ cell }) => getFechaString(cell.row.original.fecha),
    },
    // {
    //   accessorKey: "fechaReceta",
    //   header: "Fecha Receta",
    //   size: 60,
    //   Cell: ({ cell }) => getFechaString(cell.row.original.fecha),
    // },
    {
      accessorKey: "tipo",
      header: "Tipo Receta",
      filterVariant: "select",
      filterSelectOptions: ["MEDICAMENTO", "INDICACION", "ANTEOJOS"],
      size: 50,
    },

    {
      accessorKey: "paciente",
      header: "Paciente",
      size: 80,
      filterFn: (row, id, filterValue) => {
        const paciente = `${row.original.paciente?.apellido.toUpperCase()}, ${row.original.paciente?.nombre.toUpperCase()}`;
        if (
          row.original.paciente?.apellido
            .toUpperCase()
            .includes(filterValue.toUpperCase())
        )
          return true;
        if (
          row.original.paciente?.nombre
            .toUpperCase()
            .includes(filterValue.toUpperCase())
        )
          return true;
        if (
          row.original.paciente?.dni
            .toUpperCase()
            .includes(filterValue.toUpperCase())
        )
          return true;
        return false;
      },
      Cell: ({ cell }) => {
        return (
          <Link href={`/pacientes/ficha/${cell.row.original.paciente?.id}`}>
            {`${cell.row.original.paciente?.apellido}, ${cell.row.original.paciente?.nombre}`}
          </Link>
        );
      },
    },
    {
      accessorKey: "detalle",
      header: "Detalle",
      filterFn: (row, id, filterValue) => {
        if (
          `${row.original.detalle}`
            .toUpperCase()
            .includes(filterValue.toUpperCase())
        )
          return true;
        return false;
      },
    },
  ];

  if (error) return `${error}`;
  return (
    <Stack>
      <TitulosFormularios
        titulo="INFORME"
        subTitulo="de pacientes"
        icono="fas fa-file-contract"
      />

      <Grid item md={12}>
        <ColeccionTable
          dataExternal={dataPacientes}
          columns={columns}
          initialState={{ showColumnFilters: true }}
          acciones={acciones}
        />
      </Grid>
    </Stack>
  );
}
