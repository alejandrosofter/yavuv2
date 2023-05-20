import ItemsModulo from "@components/forms/itemsModulo";
import Form from "@pages/socios/mensualizado/_form";
import { ModeloMensualizado, valoresMensualizado } from "@modelos/ModeloSocios";
import { cols } from "@pages/socios/mensualizado/index";
import { Button, Icon, Stack } from "@mui/material";
import { useState } from "react";
import NuevaCtaCbu from "./nuevaCuentaCbu";
export default function Modulo({ mod, setFieldValue, values }) {
  const field = "mensualizado";
  const label = "MENSUALIZADO";
  const [openNuevoCbu, setOpenNuevoCbu] = useState(false);
  return (
    <Stack>
      <ItemsModulo
        setFieldValue={setFieldValue}
        labelBtnAgregar="AGREGAR MENSUALIZACION"
        campo={field}
        data={values[field]}
        modelo={ModeloMensualizado}
        nombreModulo={label}
        fullWidth={true}
        maxWidth={"md"}
        textoEditar={`Puedes cambiar las acciones del registro:`}
        textoAgregar={`Ingrese los datos del registro`}
        valoresIniciales={valoresMensualizado}
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
