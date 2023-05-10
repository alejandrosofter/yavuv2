import ItemsModulo from "../../../forms/itemsModulo";
import Form from "../../../socios/debitoAutomatico/_form";
import { getFechaString } from "../../../../helpers/dates";
import {
  ModeloDebitoAutomatico,
  valoresDebitoAutomatico,
} from "../../../../modelos/ModeloSocios";
import { cols } from "../../../socios/debitoAutomatico/index";
import { Button, Icon, Stack } from "@mui/material";
import { useState } from "react";
import NuevaCtaCbu from "./nuevaCtaCbu";
export default function Modulo({ mod, setFieldValue, values }) {
  const field = "debitoAutomatico";
  const label = "DEBITOS AUTOMATICOS";
  const [openNuevoCbu, setOpenNuevoCbu] = useState(false);
  return (
    <Stack>
      <Button onClick={() => setOpenNuevoCbu(true)}>
        <Icon className="fas fa-plus" /> Agregar CBU/CVU
      </Button>
      <ItemsModulo
        setFieldValue={setFieldValue}
        labelBtnAgregar="ASIGNAR CTA"
        campo={field}
        data={values[field]}
        modelo={ModeloDebitoAutomatico}
        nombreModulo={label}
        fullWidth={true}
        maxWidth={"md"}
        textoEditar={`Puedes cambiar las acciones del registro:`}
        textoAgregar={`Ingrese los datos del registro`}
        valoresIniciales={valoresDebitoAutomatico}
        form={<Form mod={mod} values={values} />}
        dataModulo={[]}
        columnas={cols}
      />
      <NuevaCtaCbu
        values={values}
        open={openNuevoCbu}
        setOpen={setOpenNuevoCbu}
      />
    </Stack>
  );
}
