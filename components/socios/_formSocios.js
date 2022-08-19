import { Grid, Icon, IconButton, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import Input from "../forms/input";

import SelectFecha from "@components/forms/selectorFecha";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFormik from "@components/forms/select2Formik";
import ImageFormik from "@components/forms/imageFormik";
import { fuego } from "@nandorojo/swr-firestore";
import { getFieldName } from "@helpers/forms";
import { getModUsuario } from "@helpers/db";
import { getEdad } from "@helpers/fechas";
export default function FormSocios({ field, setFieldValue, values, mod }) {
  const [tipoSocioSeleccion, setTipoSocioSeleccion] = useState(null);
  mod = mod.nombre === "socios" ? mod : getModUsuario("socios");
  const tipoSocios = mod.config?.itemsTipoSocios
    ? mod.config.itemsTipoSocios
    : [];
  const categoriaSocios = mod.config?.itemsCategoriaSocios
    ? mod.config.itemsCategoriaSocios
    : [];

  useEffect(() => {
    const seleccion =
      tipoSocios[
        tipoSocios.map((item) => item.nombre).indexOf(values?.tipoSocio)
      ];
    if (seleccion)
      setFieldValue(getFieldName(field, `tipoSocio`), seleccion.id);
  }, [setFieldValue, values]);
  const cambiaTipoSocio = (valor, item) => {
    // console.log(valor, item);
    setTipoSocioSeleccion(item);
    // setFieldValue(getFieldName(field, `nroSocio`), item ? item.proximoNro : "");
  };
  const cambiaCliente = (cliente) => {
    console.log(cliente);
  };
  const cambiaCategoria = (newValue) => {
    console.log(newValue);
  };
  const cambiaFecha = (newValue) => {
    // const item = getItemArray({data:categoriaSocios,valor:values.categoriaSocio,campoId:"id"})
    const edad = getEdad(newValue);
    const esActivo = values.esActivo;
    setFieldValue(getFieldName(field, `edad`), edad);
    const c = getCategoriaCondicion(edad, values.esActivo);
    console.log(c, categoriaSocios);
    setFieldValue(getFieldName(field, `categoriaSocio`), c);
  };
  const getCategoriaCondicion = (edad, esActivo) => {
    let categoria;
    categoriaSocios.map((item) => {
      if (eval(item.condicion)) categoria = item.id;
    });
    return categoria;
  };
  const clickProximo = () => {
    setFieldValue(
      getFieldName(field, `nroSocio`),
      tipoSocioSeleccion ? tipoSocioSeleccion.proximoNro : ""
    );
  };
  const agregarValoresImagen = (valores) => {
    console.log(valores);
    valores.map((item) => {
      if (item != "")
        setFieldValue(getFieldName(field, item.campo), item.value);
    });
  };
  return (
    <Grid sx={{ pt: 1, mb: 1 }} container rowSpacing={2} spacing={2}>
      <Grid item md={1}>
        <ImageFormik
          folder={`users/${fuego.auth().currentUser?.uid}/socios`}
          label="Foto "
          campo={getFieldName(field, `foto`)}
        />
      </Grid>
      <Grid item xs container sx={{ ml: 2 }} md={9} spacing={2}>
        {/* <Grid md={1} item>
          {" "}
          <DataInfoPhoto fnCambia={agregarValoresImagen} />
        </Grid> */}
        <Grid item md={2}>
          <SelectEstaticFormik
            items={["ALTA", "BAJA", "SUSPENDIDO"]}
            label="ESTADO"
            campo={getFieldName(field, `estado`)}
          />
        </Grid>
        <Grid item md={3}>
          <SelectFormik
            callbackchange={cambiaTipoSocio}
            lista={tipoSocios}
            campoId="id"
            campoLabel={"nombre"}
            label="Tipo Socio "
            campo={getFieldName(field, `tipoSocio`)}
          />
        </Grid>

        <Grid item direction="row" container md={2}>
          <Grid item md={12}>
            <Input label="Nro Socio" campo={getFieldName(field, `nroSocio`)} />
          </Grid>
          <Grid sx={{ ml: -5, mt: 1 }} item md={1}>
            {" "}
            <IconButton onClick={clickProximo}>
              <Icon
                title="Colocar Proximo nro Socio"
                className="fas fa-arrow-left"
              />
            </IconButton>
          </Grid>
        </Grid>

        {/* <Tooltip title="Al tildar modo familiar no se genera deuda mensual en este socio! .. solo en el socio en el cual se agrego a este socio">
          <Grid item md={2}>
            <SwitchFormik
              label="Modo Familiar"
              campo={getFieldName(field, `modoFamiliar`)}
            />
          </Grid>
        </Tooltip> */}
        <Grid item md={2}>
          <Input label="D.N.I " campo={getFieldName(field, `dni`)} />
        </Grid>
        <Grid item md={2}>
          <Input label="Profesion " campo={getFieldName(field, `profesion`)} />
        </Grid>
        <Grid item md={3}>
          <SelectEstaticFormik
            items={["femenino", "masculino"]}
            label="Sexo"
            campo={getFieldName(field, `sexo`)}
          />
        </Grid>
        <Grid item md={3}>
          <Input label="Nombre " campo={getFieldName(field, `nombre`)} />
        </Grid>
        <Grid item md={3}>
          <Input label="Apellido " campo={getFieldName(field, `apellido`)} />
        </Grid>

        <Grid item md={3}>
          <SelectEstaticFormik
            items={["Soltero/a", "Casado/a", "Otros"]}
            label="Estado Civil"
            campo={getFieldName(field, `estadoCivil`)}
          />
        </Grid>

        <Grid item md={2}>
          <SelectFecha
            callbackChange={cambiaFecha}
            label="Fecha Nacimiento "
            campo={getFieldName(field, `fechaNacimiento`)}
          />
        </Grid>
        <Grid item md={1}>
          <Input label="Edad" campo={getFieldName(field, `edad`)} />
        </Grid>
        <Grid item md={3}>
          <SelectFormik
            callbackchange={cambiaCategoria}
            lista={categoriaSocios}
            campoId="id"
            campoLabel={"nombre"}
            label="Categoria Socio"
            campo={getFieldName(field, `categoriaSocio`)}
          />
        </Grid>

        <Grid item md={5}>
          <Input label="Domicilio " campo={getFieldName(field, `domicilio`)} />
        </Grid>

        <Grid item md={3}>
          <SelectEstaticFormik
            items={["Comodoro Rivadavia", "Rada Tilly"]}
            label="Localidad"
            campo={getFieldName(field, `localidad`)}
          />
        </Grid>
        <Grid item md={3}>
          <Input
            label="Telefono Primario"
            campo={getFieldName(field, `telefonoMobil`)}
          />
        </Grid>
        <Grid item md={2}>
          <Input
            label="Telefono Secundario"
            campo={getFieldName(field, `telefonoMobilSecundario`)}
          />
        </Grid>
        <Grid item md={4}>
          <Input label="Email" campo={getFieldName(field, `email`)} />
        </Grid>
      </Grid>
    </Grid>
  );
}
