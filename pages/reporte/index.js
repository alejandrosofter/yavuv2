import { useEffect, useMemo, useState } from "react";

import useLayout from "@hooks/useLayout";
import {
  Backdrop,
  CircularProgress,
  Grid,
  ListItemIcon,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AcordeonForm from "@components/forms/acordeon";
import {
  useCollection,
  useCollectionGroup,
  useDocument,
} from "@nandorojo/swr-firestore";
import FacturacionPendiente from "@components/facturadorPacientes/pendientes";
import { groupBy } from "@helpers/arrays";
import { formatMoney } from "@helpers/numbers";
import ListadoFacturacionOs from "@components/facturadorPacientes/listado";
import OrdenDelDia from "@components/facturadorPacientes/ordenDelDia";

import ConfirmDialog from "@components/forms/confirmDialog";
import { QueryApi } from "@helpers/queryApi";
import { CerrarFacturacionDialog } from "@components/facturadorPacientes/cerrarFacturacion";
import { useRouter } from "next/router";
import ListaSimple from "@components/forms/listaSimple";
import { getFechaString } from "@helpers/dates";
import MaterialReactTable from "material-react-table";
import {
  DateRangeOutlined,
  Delete,
  Edit,
  InsertEmoticonSharp,
  InsertInvitationOutlined,
  MedicalServices,
  MedicationLiquid,
  OtherHousesOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import EditFacturacionItem from "@components/facturadorPacientes/edit";
import { DetalleOsLiquidacion } from "@pages/liquidaciones/[id]";
import { DataviewFacturacion } from "@pages/facturacion";

export default function Modulo({}) {
  const order = ["fecha", "desc"];
  const [dataConsulta, setDataConsulta] = useState();
  const [dataSelect, setDataSelect] = useState([]);
  const [openConfirmCerrar, setConfirmCerrar] = useState(false);
  const router = useRouter();
  const [osSelect, setOsSelect] = useState();
  const [dataItems, setDataItems] = useState([]);
  const [dataMes, setDataMes] = useState([]);
  const [dataAnio, setDataAnio] = useState([]);

  const { data } = useCollection(`recetasLiquidaciones/`, {
    listen: true,
    orderBy: order,
  });

  useEffect(() => {
    if (!data) return;

    // Agrupar por año y mes
    const groupedData = data.reduce((acc, item) => {
      const date = new Date(item.hastaFecha.seconds * 1000); // Suponiendo que `fecha` es un campo en cada registro
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth() es 0-based

      const key = `${year}-${month}`;

      if (!acc[key]) {
        acc[key] = {
          year,
          month,
          records: [],
          importeTotal: 0,
        };
      }
      acc[key].importeTotal += item.importeTotal || 0;
      acc[key].records.push(item);
      return acc;
    }, {});

    // Convertir en array
    const groupedArray = Object.values(groupedData);

    setDataAnio(groupedArray);
  }, [data]);
  useLayout({
    label: "Detalle Liquidacion",
    titulo: "Detalle Liquidacion",
    acciones: [
      {
        label: `facturacion`,
        icono: "fas fa-file-invoice-dollar",
        url: `/facturacion`,
      },
      {
        label: "Liquidaciones",
        icono: "fas fa-money-check",
        url: "/liquidaciones",
      },
      {
        label: "Reportes",
        icono: "fas fa-receipt",
        url: "/reporte",
      },
      { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
    ],
  });
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const clickItem = (dataAnio) => {
    const groupedData = dataAnio.records?.reduce((acc, item) => {
      const date = new Date(item.hastaFecha.seconds * 1000); // Suponiendo que `fecha` es un campo en cada registro
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth() es 0-based
      const monthLetras = meses[month - 1];
      const key = `${month}`;

      if (!acc[key]) {
        acc[key] = {
          year,
          month,
          records: [],
          importeTotal: 0,
          monthLetras,
        };
      }
      acc[key].importeTotal += item.importeTotal || 0;
      acc[key].records.push(item);
      return acc;
    }, {});

    // Convertir en array
    const groupedArray = Object.values(groupedData);

    setDataMes(groupedArray);
  };
  const clickItemMes = (recordMes) => {
    // Unir todos los items de los registros dentro de recordMes.records
    const groupedData = {
      ...recordMes, // Mantener los datos originales (importeTotal, year, month, monthLetras)
      items: recordMes.records.reduce((acc, record) => {
        return [...acc, ...(record.items || [])]; // Concatenar los items de cada record
      }, []),
    };

    setDataItems(groupedData);
  };

  if (!data) return "";
  return (
    <Grid container sx={{ p: 2 }} rowSpacing={2} spacing={2}>
      <Grid item md={1}>
        <Typography sx={{}} variant="h6">
          <DateRangeOutlined /> {`Año`}
        </Typography>
        <ListaSimple
          items={dataAnio}
          label="Fecha"
          onClick={clickItem}
          fnRender={(item) => (
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h4">{`${item.year}  `}</Typography>
              <Typography variant="body">
                {`${formatMoney(item.importeTotal)}  `}
              </Typography>
            </Stack>
          )}
        />
      </Grid>
      <Grid item md={1}>
        <Typography sx={{}} variant="h6">
          <DateRangeOutlined /> {`Mes `}
        </Typography>
        <ListaSimple
          items={dataMes}
          label="Fecha mes"
          onClick={clickItemMes}
          fnRender={(item) => (
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h6">{`${item.monthLetras}  `}</Typography>
              <Typography sx={{ fontWeight: "bold" }} variant="body">
                {`${formatMoney(item.importeTotal)}  `}
              </Typography>
            </Stack>
          )}
        />
      </Grid>
      <Grid item md={10}>
        <Typography sx={{}} variant="h6">
          <MedicalServices /> {`Entes Facuradores `}
        </Typography>
        <DataviewFacturacion
          titleItems={
            <Typography sx={{}} variant="h6">
              <MedicationLiquid /> {`Paracticas realizadas `}
            </Typography>
          }
          data={dataItems?.items}
          hideCerrar={true}
          hideOrden={true}
        />
      </Grid>
    </Grid>
  );
}
