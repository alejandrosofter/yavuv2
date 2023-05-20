import { IconButton, Stack, Icon } from "@mui/material";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { Fragment, useEffect, useState } from "react";
import TitulosFormularios from "@components/forms/tituloFormularios";
import { getItemObject } from "@helpers/arrays";
import Filtro from "@components/compras/_filter";
import Tabla from "@components/compras/_reporte";
import { formatMoney } from "@helpers/numbers";
import { getFechaString } from "@helpers/dates";
import EditarComprasModal from "@components/compras/editModal";
export default ({}) => {
  const [openEditar, setOpenEditar] = useState(false);
  const [seleccion, setSeleccion] = useState();
  const [filtro, setFiltro] = useState({
    where: ["idUsuario", "==", fuego.auth().currentUser?.uid],
    orderBy: ["fecha", "desc"],
  });
  const { data, error } = useCollection(`compras`, filtro);

  const condiciones = [
    {
      campo: "idUsuario",
      condicional: "==",
      field: fuego.auth().currentUser?.uid,
    },
    { campo: "idEntidad", condicional: "==", field: "idEntidad" },
    { campo: "idCentroCosto", condicional: "==", field: "idCentroCosto" },
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
  if (error) return `${error}`;
  return (
    <Stack>
      <TitulosFormularios
        titulo="INFORME"
        subTitulo="de compras"
        icono="fas fa-file-contract"
      />
      <Filtro callbackBuscar={buscar} />
      <Tabla
        data={data}
        cols={[
          {
            label: "Fecha",
            field: "fecha",
            fn: (valor) => {
              return getFechaString(valor);
            },
          },
          {
            label: "Detalle",
            field: "detalle",
            fn: (valor, row) => {
              const items = row.items?.map(
                (item) =>
                  `${item.cantidad} ${item.detalle} ${formatMoney(
                    item.importe
                  )}`
              );
              return `DETALLE: ${valor} ITEMS: ${items ? items : "-"}`;
            },
          },
          {
            fn: formatMoney,
            align: "right",
            label: "$ Total",
            field: "importeTotal",
          },
          {
            label: "",
            field: "id",
            fn: (valor, row) => {
              return (
                <IconButton
                  onClick={() => {
                    setSeleccion(row);
                    setOpenEditar(true);
                  }}
                >
                  <Icon className="fas fa-pencil" />
                </IconButton>
              );
            },
          },
        ]}
      />
      <EditarComprasModal
        open={openEditar}
        setOpen={setOpenEditar}
        doc={seleccion}
      />
    </Stack>
  );
};
