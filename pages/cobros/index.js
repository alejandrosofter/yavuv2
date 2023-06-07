import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import ImpresionDialog from "@components/forms/impresion";
import { useRef, useState } from "react";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { Box, Button, Grid, Typography } from "@mui/material";
import { parse } from "handlebars";
import Modelo, { valoresIniciales } from "@modelos/ModeloCobros";
import ABMColeccion from "@components/forms/ABMcollection2";
import Form from "@components/cobros/_form";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import { getWherePermiso } from "@hooks/useUser";
import useLayout from "@hooks/useLayout";
import { fuego } from "@nandorojo/swr-firestore";
import MenuCajaDiaria from "@components/cobros/menuCajaDiaria";
export default function Modulo({ parentData }) {
  const order = ["fecha_timestamp", "desc"];
  const config = UseConfigModulo("cobros");
  useLayout({
    label: "Cobros",
    titulo: "COBROS",
    icon: "fas fa-bill-dollar",
    acciones: [
      { label: "Cobros", icono: "fas fa-home", url: "/cobros" },
      { label: "Informes", icono: "fas fa-newspaper", url: "/cobros/informes" },
    ],
    components: <MenuCajaDiaria />,
  });
  const idPlantilla = config?.plantillaCobro;
  const plantillaEmail = config?.plantillaMail;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [socio, setSocio] = useState();
  const tableInstanceRef = useRef();

  const [dataConsulta, setDataConsulta] = useState();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const fnLabelDetalle = (item, nro) => {
    const bonif = Number(
      item.importeBonificacion ? item.importeBonificacion : 0
    );
    const importe = (item.importe * item.cantidad - bonif).toFixed(2);

    return `${nro}.- ${item.label_idProducto}  ${
      item.detalle ? item.detalle : ""
    } $${importe}, `;
  };
  const getDetalle = (row) => {
    const items = row.deudas;
    let aux = "";
    if (items)
      for (let i = 0; i < items.length; i++) {
        aux += fnLabelDetalle(items[i], i + 1);
      }
    //return parse html
    parse;
    return aux;
  };
  const setSocioCobro = async (row) => {
    const { cliente } = row;
    fuego.db
      .collection("socios")
      .doc(cliente)
      .get()
      .then((doc) => {
        setSocio(doc.data());
      });
  };
  let fnAcciones = [
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",

      fn: (data) => {
        setOpenImpresion(true);
        setSocioCobro(data);
        setDataImpresion(data);
      },
    },
    // {
    //   esFuncion: true,
    //   icono: "fas fa-users",
    //   label: "Inscriptos",

    //   fn: (data) => {
    //     setOpenCajaDelDia(true);
    //   },
    // },
  ];
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 120,
      enableColumnFilter: false,
      filterFn: "filtroFecha",
      Cell: ({ cell }) => {
        return getFechaString(cell.getValue(), "DD/MM/YY | hh:mm");
      },
    },
    {
      accessorKey: "label_cliente",
      header: "Cliente",
      filterFn: "includesString",
      size: 250,
    },
    {
      accessorKey: "deudas",
      header: "Detalle",
      size: 300,
      filterFn: "includesString",
      Cell: ({ cell }) => getDetalle(cell.row.original),
    },
    {
      accessorKey: "importe",
      header: "$ Importe",
      size: 120,
      enableColumnFilter: false,
      Cell: ({ cell }) => {
        return formatMoney(cell.getValue());
      },
    },
    {
      accessorKey: "importeBonificacion",
      header: "$ Bonif.",
      size: 110,
      enableColumnFilter: false,
      Cell: ({ cell }) => {
        return formatMoney(cell.getValue());
      },
    },
    {
      accessorKey: "importePaga",
      header: "$ Paga",
      enableColumnFilter: false,
      size: 150,
      Cell: ({ cell }) => {
        return formatMoney(cell.getValue());
      },
    },
  ];
  const onCreate = (newData, id) => {
    const data = { ...newData, id };
    setOpenImpresion(true);
    setSocioCobro(data);
    setDataImpresion(data);
  };
  return (
    <Grid container>
      <ABMColeccion
        coleccion={`cobros`}
        columns={columns}
        acciones={fnAcciones}
        maxWidth={"lg"}
        where={getWherePermiso(`cobros`)}
        gridOptions={{
          tableInstanceRef,

          renderDetailPanel: ({ row }) => {
            return (
              <Box
                sx={{
                  display: "grid",
                  margin: "auto",
                  gridTemplateColumns: "1fr 1fr",
                  width: "100%",
                }}
              ></Box>
            );
          },
          initialState: { showColumnFilters: true },
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
        callbackSuccessNew={onCreate}
        dataForm={{}}
        titulo={`COBROS`}
        Form={Form}
      />
      <ImpresionDialog
        titulo="PANEL COMPARTIR COBRO"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="COMPROBANTE DE PAGO"
        data={{ ...dataImpresion, socio, email: socio?.email }}
        plantilla={plantilla}
        emailDefault={socio?.email}
        plantillaEmail={plantillaEmail}
        attachments={[{ filename: "COBRO.pdf", data: plantilla }]}
      />
    </Grid>
  );
}
