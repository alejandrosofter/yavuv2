import { Grid } from "@mui/material";
import {
  ModeloPromociones,
  valoresInicialesPromocion,
} from "@modelos/ModeloSocios";
import { getFechaString } from "@helpers/dates";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
export const cols = [
  {
    field: "fechaInicio",
    headerName: "Fecha ",
    width: 90,
    renderCell: (params) => getFechaString(params.value),
  },
  {
    field: "fechaVto",
    headerName: "Fecha Vto",
    width: 90,
    renderCell: (params) => getFechaString(params.value),
  },
  {
    field: "label_idPromocion",
    headerName: "Promocion",
    width: 250,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 100,
  },
];

export default function PromocionesSocios({ data, mod, auth }) {
  const order = ["fecha"];
  const subColeccion = "promociones";
  const icono = "fas fa-gift";
  const titulo = `PROMOCIONES `;

  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`socios/${data?.id}/${subColeccion}`}
          columns={cols}
          order={order}
          // callbackclick={callbackclick}
          icono={icono}
          Modelo={ModeloPromociones}
          valoresIniciales={valoresInicialesPromocion}
          dataForm={{ mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
    </Grid>
  );
}
