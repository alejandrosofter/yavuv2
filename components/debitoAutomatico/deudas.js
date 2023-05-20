import ColeccionTable from "@components/forms/coleccionTable";
import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import { getModUsuario } from "@helpers/db";
import { formatMoney } from "@helpers/numbers";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function ItemsDebitoAutomatico({ open, setOpen, debito }) {
  const router = useRouter();
  const modSocios = getModUsuario("socios");
  const order = ["label_socio", "asc"];
  const clickSocio = (row) => {
    localStorage.setItem(
      "socioSeleccion",
      JSON.stringify({
        objectID: row.idSocio,
        apellido: row.apellido,
        nombre: row.nombre,
        dni: row.dni,
      })
    );
    //open new tab
    router.push("/mod/[id]", `/mod/${modSocios.id}`, {
      shallow: true,
    });
  };

  const columns = [
    {
      field: "cbu",
      headerName: "CBU",
      width: 180,
    },
    {
      field: "label_socio",
      headerName: "Socio",
      width: 200,
      renderCell: (params) => (
        <Typography
          onClick={clickSocio.bind(this, params.row)}
          variant="caption"
          key={params.row.idSocio}
        >
          <a href={`#${params.row.id}`} id={params.row.id}>
            {params.value}
          </a>
        </Typography>
      ),
    },
    {
      field: "titular",
      headerName: "Titular",
      width: 200,
    },

    {
      field: "label_idProducto",
      headerName: "Producto/Servicio",
      width: 250,
    },
    {
      field: "importe",
      headerName: "$ Importe",
      width: 100,
      renderCell: (params) => `${formatMoney(params.value)}`,
    },
    {
      field: "importeBonifica",
      headerName: "$ Bonif.",
      width: 100,
      renderCell: (params) => `${formatMoney(params.value)}`,
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
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="lg"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item md={9}>
          <Typography variant="h6" gutterBottom>
            {`TITULARES DE DEBITO AUTOMATICO`}
          </Typography>
        </Grid>

        <Grid item md={12}>
          <ColeccionTable
            columns={columns}
            orderBy={order}
            coleccion={`debitoAutomatico/${debito?.id}/deudas/`}
          />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
