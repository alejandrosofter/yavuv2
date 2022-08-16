import ListaSimple from "@components/forms/listaSimple";
import Tabla from "@components/forms/tabla";
import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { Grid, Stack, Typography } from "@mui/material";
import { useCollection } from "@nandorojo/swr-firestore";
import { useState } from "react";

import Link from "next/link";
import ColeccionTable from "@components/forms/coleccionTable";
import { useRouter } from "next/router";
import { getModUsuario } from "@helpers/db";
import { Box } from "@mui/system";
export default function ListadoItemsBanco({ idDebito, respuestaBanco }) {
  const router = useRouter();
  const modSocios = getModUsuario("socios");
  const coleccion = `debitoAutomatico/${idDebito}/respuestasBanco/${respuestaBanco?.id}/items`;
  const { data } = useCollection(coleccion, {
    orderBy: "cbu",
    listen: true,
  });

  const [openNew, setOpenNew] = useState(false);
  const [seleccion, setSeleccion] = useState();
  const clickAdd = async () => {
    setOpenNew(true);
  };

  const clickLista = (item) => {
    if (callbackcambia) callbackcambia(item);
    setSeleccion(item);
  };
  const clickSocio = (row) => {
    console.log(row);
    localStorage.setItem(
      "socioSeleccion",
      JSON.stringify({
        objectID: row.idSocio,
        apellido: row.apellido,
        nombre: row.nombre,
        dni: row.dni,
      })
    );
    router.push("/mod/[id]", `/mod/${modSocios.id}`, {
      shallow: true,
    });
  };
  const order = ["titular", "asc"];
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-link",
    //   label: "Ir Perfil",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     console.log(row);
    //     localStorage.setItem(
    //       "socioSeleccion",
    //       JSON.stringify({
    //         objectID: row.idSocio,
    //         apellido: row.apellido,
    //         nombre: row.nombre,
    //         dni: row.dni,
    //       })
    //     );
    //     router.push("/mod/[id]", `/mod/${modSocios.id}`, {
    //       shallow: true,
    //     });
    //   },
    // },
  ];
  const columns = [
    {
      field: "cbu",
      headerName: "CBU",
      width: 180,
    },

    {
      field: "titular",
      headerName: "Titular",
      width: 180,
    },
    {
      field: "dataMach",
      headerName: "Socios",
      width: 320,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Box>
              {params.value.map((item) => (
                <a href={`#${item.id}`} id={item.id}>
                  <Typography
                    onClick={clickSocio.bind(this, item)}
                    variant="caption"
                    key={item.idSocio}
                  >
                    {`${item.label_socio} ${formatMoney(
                      item.idProducto_importe
                    )}`}
                  </Typography>
                </a>
              ))}
            </Box>
          </Stack>
        );
      },
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 120,
    },
  ];

  return (
    <Grid container>
      <Grid item md={8}>
        <Typography variant="h6">ITEMS</Typography>
      </Grid>

      <Grid item xs={12}>
        <ColeccionTable
          acciones={acciones}
          columns={columns}
          orderBy={order}
          coleccion={coleccion}
        />
      </Grid>
    </Grid>
  );
}
