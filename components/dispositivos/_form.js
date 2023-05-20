import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFormik from "@components/forms/select";
import ItemsModulo from "@components/forms/itemsModulo";
import {
  ModeloDisparadores,
  valoresInicialesDisapradores,
} from "../../modelos/ModeloDispositivo";
import FormItem from "./_formDisparadores";
export default function Form({ mod, setFieldValue, values }) {
  const tipoEquipos = mod.config.itemsTipoEquipos
    ? mod.config.itemsTipoEquipos
    : [];
  return (
    <Grid>
      <Stack>
        <Grid
          sx={{ pt: 1, pb: 1 }}
          md={12}
          container
          rowSpacing={2}
          spacing={2}
        >
          <Grid item md={4}>
            <Input label="Nombre" campo="nombre" />
          </Grid>
          <Grid item md={2}>
            <SelectFormik
              lista={tipoEquipos}
              campoId="id"
              campoLabel={"nombre"}
              label="Tipo Equipo"
              campo="tipoEquipo"
            />
          </Grid>
          <Grid item md={2}>
            <Input label="ID del equipo" campo="identificador" />
          </Grid>
          <Grid item md={2}>
            <Input label="CLAVE del equipo" campo="clave" />
          </Grid>

          <Grid item md={2}>
            <SelectEstaticFormik
              items={["CONECTADO", "PENDIENTE", "DESCONECTADO"]}
              label="Estado"
              campo="estado"
            />
          </Grid>
          <Grid item md={12}>
            <ItemsModulo
              setFieldValue={setFieldValue}
              campo="disparadores"
              data={values.disparadores}
              modelo={ModeloDisparadores}
              nombreModulo="DISPARADORES"
              fullWidth={true}
              maxWidth={"md"}
              textoEditar={`Puedes cambiar las propiedades:`}
              textoAgregar={`Ingrese los datos `}
              valoresIniciales={valoresInicialesDisapradores()}
              form={<FormItem mod={mod} />}
              dataModulo={[]}
              columnas={[
                { field: "nombre", headerName: "Nombre", width: 100 },
                { field: "canal", headerName: "Canal", width: 80 },
                { field: "condicion", headerName: "Condicion", width: 200 },
                { field: "accionSemana", headerName: "Semana", width: 80 },
                { field: "accionHora", headerName: "Hrs", width: 80 },
                { field: "accionMinuto", headerName: "Mins", width: 90 },
                { field: "cantidad", headerName: "Cant", width: 90 },
              ]}
            />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
