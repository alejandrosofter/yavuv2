import { formatMoney } from "@helpers/numbers";
import { getFechaString } from "@helpers/dates";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import Form from "@components/compras/_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloCompras";
import { useRef } from "react";
import { getWherePermiso } from "@hooks/useUser";
import useLayout from "@hooks/useLayout";
export default function Modulo({ parentData }) {
  useLayout({
    label: "Compras",
    titulo: "COMPRAS",
    icon: "fas fa-users",
    acciones: [
      {
        label: "Compras",
        icono: "fas fa-users",
        url: "/compras",
      },
      {
        label: "Proveedores",
        icono: "fas fa-user-tie",
        url: "/proveedores",
      },
      {
        label: "Informes",
        icono: "fas fa-scroll",
        url: "/compras/informes",
      },
    ],
  });
  const tableInstanceRef = useRef();
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 100,
      Cell: ({ cell }) =>
        getFechaString(cell.getValue() ? cell.getValue() : ""),
    },
    {
      accessorKey: "label_idCentroCosto",
      header: "CC",
      size: 200,
    },
    {
      accessorKey: "label_idEntidad",
      header: "Proveedor",
      size: 200,
    },
    {
      accessorKey: "detalle",
      header: "Detalle",
      size: 250,
    },
    {
      accessorKey: "importeTotal",
      header: "$ Importe",
      size: 100,
      Cell: ({ cell }) => formatMoney(cell.getValue() ? cell.getValue() : 0),
    },

    {
      accessorKey: "estado",
      header: "Estado",
      size: 100,
    },
  ];
  const order = ["fecha", "desc"];
  const fnAcciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-share-alt",
    //   label: "Compartir",
    //   fn: (data) => {
    //     setOpenImpresion(true);
    //     setSocioCobro(data);
    //     setDataImpresion(data);
    //   },
    // },
  ];

  return (
    <ABMColeccion2
      coleccion={`compras`}
      columns={columns}
      acciones={fnAcciones}
      maxWidth={"lg"}
      where={getWherePermiso("compras")}
      gridOptions={{
        tableInstanceRef,

        // renderDetailPanel: ({ row }) => {
        //   return (
        //     <Box
        //       sx={{
        //         display: "grid",
        //         margin: "auto",
        //         gridTemplateColumns: "1fr 1fr",
        //         width: "100%",
        //       }}
        //     ></Box>
        //   );
        // },
        initialState: { showColumnFilters: false },
        enableRowSelection: false,
        filterFns: {
          filtroFecha: (row, id, filterValue) => {
            const date = new Date(row.original[id].seconds * 1000);
            const dateFiltro = new Date(filterValue);

            //si es fecha invalida
            if (isNaN(dateFiltro.getTime())) return true;
            //comparo fechas
            return (
              date.getDate() === dateFiltro.getDate() &&
              date.getMonth() === dateFiltro.getMonth() &&
              date.getFullYear() === dateFiltro.getFullYear()
            );
          },
        },
        // getRowId: (row) => row.id,
      }}
      orderBy={order}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      // dataForm={{ grupo: seleccion }}
      titulo={`COMPRAS`}
      Form={Form}
    />
  );
}
