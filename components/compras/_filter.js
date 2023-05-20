import { Grid, Stack } from "@mui/material";
import FilterGenerico from "@components/filterGenerico";

import { useCollection, fuego } from "@nandorojo/swr-firestore";
import SelectCentroCosto from "@components/centroCostos/select";
import SelectProveedor from "@components/proveedores/select";

export default ({ callbackBuscar }) => {
  const { data: centrosCosto } = useCollection("centroCostos", {
    where: ["idUsuario", "==", fuego.auth().currentUser?.uid],
  });
  const { data: proveedores } = useCollection("proveedores", {
    where: ["idUsuario", "==", fuego.auth().currentUser?.uid],
  });
  const estados = [{ label: "PENDIENTE" }, { label: "CANCELADO" }];
  const valoresIniciales = { estado: "", idEntidad: "", idCentroCosto: "" };
  return (
    <FilterGenerico
      callbackSuccess={callbackBuscar}
      valoresIniciales={valoresIniciales}
    >
      {/* <Grid item md={4}><SelectFecha label="Desde" campo="fechaDesde"/></Grid>
                <Grid item md={4}><SelectFecha label="Hasta" campo="fechaHasta"/></Grid> */}

      <Grid spacing={2} container>
        <Grid item md={6}>
          <SelectCentroCosto />
        </Grid>
        <Grid item md={6}>
          <SelectProveedor campo={"idEntidad"} />
        </Grid>

        {/* <Grid item md={6}><Select2 campo='estado' label="Estado" lista={estados} campoId="label" 
                    campoLabel="label" /></Grid> */}
      </Grid>
    </FilterGenerico>
  );
};
