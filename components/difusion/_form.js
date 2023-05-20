import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";
import { getModUsuario } from "@helpers/db";
import { Grid, Stack } from "@mui/material";
import { useState } from "react";
import Input from "@components/forms/input";
import RichEditor from "@components/forms/richEditorFormik";
import SelectorModDifusion from "./selectorModDifusion";
import SelectorCondiciones from "./selectorCondicion";
import TestDifusion from "./test";
export default function Form({ mod, setFieldValue, values }) {
  const [condiciones, setCondiciones] = useState([]);
  const cambiaModulo = (id, item) => {
    if (item) setCondiciones(item.config?.itemsDifusion);
    else setCondiciones([]);
  };
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
          <Grid item md={2}>
            <SelectFecha label="Fecha" campo="fecha" />
          </Grid>
          <Grid item md={4}>
            <Input label="Asunto" campo="asunto" />
          </Grid>
          <Grid item md={2}>
            <SelectEstaticFormik
              items={["PENDIENTE", "ENVIADO"]}
              label="Estado"
              campo="estado"
            />
          </Grid>
          <Grid item md={2}>
            <SelectorModDifusion
              parent={true}
              callbackchange={cambiaModulo}
              label="Modulo"
              campo="modulo"
            />
          </Grid>
          <Grid item md={2}>
            <SelectorCondiciones
              label="Condicion"
              condiciones={condiciones}
              campo="condicion"
            />
          </Grid>
          <Grid item md={12}>
            <RichEditor label="Mensaje" campo="mensaje" />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
