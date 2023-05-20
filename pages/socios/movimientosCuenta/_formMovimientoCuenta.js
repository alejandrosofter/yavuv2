import { Grid, IconButton, Typography } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectProducto from "@pages/productos/selectProducto";
import SelectFecha from "@components/forms/selectorFecha";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFormikAlgolia from "@components/forms/selectAlgoliaFormik";
import EditarDialogCbu from "@pages/cuentasCbu/editarDialog";
import NuevoDialogCbu from "@pages/cuentasCbu/nuevoDialog";
import { useState } from "react";

export default function Form({ setFieldValue, values }) {
  const [openEditarCbu, setOpenEditarCbu] = useState(false);
  const [openNuevoCbu, setOpenNuevoCbu] = useState(false);
  const cambiaProducto = (producto, item) => {
    if (item) {
      setFieldValue("importe", item.importe);
    }
  };
  const editoCbuSuccess = (item) => {
    setOpenEditarCbu(false);
    setItemsCuenta(item);
  };
  const clickEditarCbu = () => {
    setOpenNuevoCbu(true);
  };
  const clickNuevoCbu = () => {
    setOpenEditarCbu(true);
  };
  const setItemsCuenta = (item) => {
    setFieldValue(`banco`, item.banco);
    setFieldValue(`cbu`, item.cbu);
    setFieldValue(`titular`, item.titular);
    setFieldValue(`nroCuenta`, item.nroCuenta);
    setFieldValue(`tipoCuenta`, item.tipoCuenta);
    setFieldValue(`label_tipoCuenta`, item.label_tipoCuenta);
  };
  const cambiaCuenta = (item) => {
    if (item) setItemsCuenta(item);
  };
  return (
    <Grid sx={{ p: 2 }} container spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="Vto" campo="fechaVto" />
      </Grid>
      <Grid item md={1}>
        <Input label="Cant. " campo="cantidad" />
      </Grid>
      <Grid item md={6}>
        <SelectProducto callbackchange={cambiaProducto} />
      </Grid>
      <Grid item md={2}>
        <Input label="Importe" campo="importe" />
      </Grid>
      <Grid item md={2}>
        <Input label="Importe Bonificacion" campo="importeBonificacion" />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["PENDIENTE", "CANCELADO"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
      <Grid item md={3}>
        <Switch label="Debito Automatico " campo="esPorDebitoAutomatico" />
      </Grid>
      {values.esPorDebitoAutomatico && (
        <Grid item md={8}>
          <SelectFormikAlgolia
            coleccionAlgolia={"cuentasCbu"}
            label="Cuenta CBU"
            labelItems={(opt) =>
              `${opt.titular} ${opt.dniTitular ? opt.dniTitular : "(sin dni)"}`
            }
            campo="idCuentaCbu"
            callbackchange={cambiaCuenta}
          />
          <Typography variant="caption">
            {`CBU: ${values.cbu} BANCO: ${
              values.tipoCuenta ? values.label_tipoCuenta : "-"
            }`}{" "}
            <IconButton
              size="small"
              onClick={clickEditarCbu}
              className="fas fa-pencil"
              title="Editar"
            ></IconButton>
            <IconButton
              size="small"
              onClick={clickNuevoCbu}
              className="fas fa-plus"
              title="Agregar Cuenta"
            ></IconButton>
          </Typography>
        </Grid>
      )}
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
      <EditarDialogCbu
        idItem={values.idCuentaCbu}
        open={openEditarCbu}
        setOpen={setOpenEditarCbu}
        callbackSuccess={editoCbuSuccess}
      />
      <NuevoDialogCbu
        open={openEditarCbu}
        setOpen={setOpenEditarCbu}
        callbackSuccess={editoCbuSuccess}
      />
    </Grid>
  );
}
