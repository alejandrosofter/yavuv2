import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectProfesor from "@components/profesores/select";
import SelectProducto from "@components/productos/selectProducto";
export default function FormGrupo({ mod, setFieldValue, values }) {
  return (
    <Grid container rowSpacing={2} spacing={2}>
      <Grid item md={6}>
        <Input label="Nombre Grupo" campo="nombreGrupo" />
      </Grid>
      <Grid item md={2}>
        <Switch
          label="Tiene producto diferente"
          campo="tieneProductoDiferente"
        />
      </Grid>
      {values.tieneProductoDiferente && (
        <Grid item md={4}>
          <SelectProducto />
        </Grid>
      )}
      <Grid item md={5}>
        <SelectProfesor />
      </Grid>
      <Grid item md={2}>
        <Input label="Cupo" campo="cupo" />
      </Grid>
      <Grid item md={4}>
        <Input
          label="Cantidad Clases Mensuales"
          campo="cantidadClasesMensuales"
        />
      </Grid>
      <Grid item md={4}>
        <SelectEstaticFormik
          items={["ACTIVA", "RECESO", "SUSPENDIDA"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
      <Grid item md={12}>
        <Input rows={3} multiline={true} label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
