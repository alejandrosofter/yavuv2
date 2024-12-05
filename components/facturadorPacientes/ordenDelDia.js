import { DateRange } from "@mui/icons-material";
import { Grid, Stack, Typography } from "@mui/material";
import { useCollection } from "@nandorojo/swr-firestore";
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import { useEffect, useState } from "react";
import { groupBy } from "@helpers/arrays";
import { formatMoney } from "@helpers/numbers";
export default function OrdenDelDia() {
  const [desdeDate, setDesdeDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)).getTime()
  );
  const [hastaDate, setHastaDate] = useState(
    new Date(new Date().setHours(23, 59, 59, 999)).getTime()
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalImporte, setTotalImporte] = useState(0);
  const [groupByObraSocial, setGroupByObraSocial] = useState([]);

  const { data, error } = useCollection("recetasFacturacion", {
    where: [
      ["fecha_timestamp", ">=", desdeDate],
      ["fecha_timestamp", "<=", hastaDate],
    ],
    orderBy: ["fecha_timestamp", "desc"],

    listen: true,
  });
  useEffect(() => {
    if (!data || !data.length || error || data.length === 0) {
      setTotalImporte(0);
      setGroupByObraSocial([]);
      return;
    }
    setTotalImporte(
      data?.reduce((total, item) => total + Number(item.importe), 0)
    );
    const dataGroup = groupBy(data, (item) => item.obraSocial, true);
    let arr = [];
    for (let key in dataGroup) {
      arr.push({
        obraSocial: key,
        label_obraSocial: dataGroup[key][0].label_obraSocial,
        cantidadItems: dataGroup[key].length,
        cantidad: dataGroup[key].reduce(
          (total, item) => total + Number(item.cantidad),
          0
        ),
        importeTotal: dataGroup[key].reduce(
          (total, item) => total + Number(item.importe),
          0
        ),
      });
    }
    setGroupByObraSocial(arr);
  }, [data]);

  const changeDate = (newDate) => {
    setSelectedDate(date);

    const date = newDate ? newDate.toDate() : new Date();

    const inicioDelDia = new Date(date.setHours(0, 0, 0, 0)).getTime();

    // Obtenemos el timestamp para el final del día (23:59:59)
    const finDelDia = new Date(date.setHours(23, 59, 59, 999)).getTime();

    setDesdeDate(inicioDelDia);
    setHastaDate(finDelDia);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography sx={{ fontWeight: 900 }} variant="caption">
          <DateRange /> ORDEN DEL DIA
        </Typography>
        <DatePicker
          value={selectedDate}
          onChange={changeDate}
          format="DD/MM/YYYY"
        />
      </Grid>
      <Grid item md={12}>
        {data?.length === 0 && (
          <Typography sx={{ fontWeight: 900, color: "red" }} variant="caption">
            No hay facturacion en esta fecha!
          </Typography>
        )}
        {data?.map((item, index) => (
          <Stack direction="row" spacing={2} key={item.id}>
            <Typography
              sx={{ fontWeight: 450, color: "green" }}
              variant="caption"
              display="block"
            >
              {`${index + 1} `}
            </Typography>
            <Typography
              sx={{ fontWeight: 900 }}
              variant="caption"
              display="block"
            >
              {`${item.paciente?.apellido} ${item.paciente?.nombre} `}
            </Typography>
            <Typography
              sx={{ fontWeight: 350 }}
              variant="caption"
              display="block"
            >
              {`${item.codigo} `}
            </Typography>
          </Stack>
        ))}
      </Grid>
      <Grid item md={12}>
        {groupByObraSocial?.map((item, index) => (
          <Stack direction="row" spacing={2} key={item.id}>
            <Typography
              sx={{ fontWeight: 900 }}
              variant="caption"
              display="block"
            >
              {`${item.label_obraSocial} (${item.cantidad})`}
            </Typography>
            <Typography
              sx={{ fontWeight: 350 }}
              variant="caption"
              display="block"
            >
              {`${formatMoney(item.importeTotal)} `}
            </Typography>
          </Stack>
        ))}
      </Grid>
      <Grid item md={12}>
        <Typography sx={{ fontWeight: 900 }} variant="h6">
          TOTAL {formatMoney(totalImporte)}
        </Typography>
      </Grid>
    </Grid>
  );
}
