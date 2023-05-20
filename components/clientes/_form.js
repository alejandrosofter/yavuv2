import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import { getFieldName } from "../../helpers/forms";
import SelectFormik from "@components/forms/select";
import Switch from "@components/forms/switch";
import { useState } from "react";
export default function FormClientes({ field, mod, setFieldValue, values }) {
  //   const itemsTipos = mod.config.itemsTipos ? mod.config.itemsTipos : [];
  //   const [muestraEmpresa, setMuestraEmpresa] = useState(false);
  //   const cambiaTipo = (valor, item) => {
  //     setMuestraEmpresa(item.esEmpresa);
  //     setFieldValue(getFieldName(field, "esEmpresa"), item.esEmpresa);
  //   };
  return (
    <Grid container spacing={2}>
      {/* <Grid item md={2}>
        <SelectFormik
          callbackchange={cambiaTipo}
          lista={itemsTipos}
          campoId="id"
          campoLabel="nombre"
          label="Tipo Cliente"
          campo={getFieldName(field, "tipoCliente")}
        />
      </Grid> */}
      <Grid item md={3}>
        <Switch campo={getFieldName(field, "esEmpresa")} label="Es Empresa" />
      </Grid>
      {values.esEmpresa && (
        <Grid spacing={2} container item>
          <Grid item md={4}>
            <Input
              label="Razon Social"
              campo={getFieldName(field, "razonSocial")}
            />
          </Grid>
          <Grid item md={3}>
            <Input label="CUIT" campo={getFieldName(field, "cuit")} />
          </Grid>
        </Grid>
      )}
      {!values.esEmpresa && (
        <Grid spacing={2} container item>
          <Grid item md={3}>
            <Input label="Nombre" campo={getFieldName(field, "nombre")} />
          </Grid>
          <Grid item md={3}>
            <Input label="Apellido" campo={getFieldName(field, "apellido")} />
          </Grid>
          <Grid item md={2}>
            <Input label="DNI" campo={getFieldName(field, "dni")} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
