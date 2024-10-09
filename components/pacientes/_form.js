import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import WebcamFormik from "@components/forms/imageFormik";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import FormOs from "@components/pacientes/_formOs";
import { ModeloOsPaciente, valoresInicialesOs } from "@modelos/ModeloPacientes";
import { fuego, update, useCollection } from "@nandorojo/swr-firestore";
import InputTelefono from "@components/forms/inputTelefono";
import TabsFormik from "@components/forms/tab";
import ItemsModulo from "@components/forms/itemsModulo";
import SelectOsPaciente from "@components/pacientes/selectOsPaciente";
import SelectFecha from "@components/forms/selectorFecha";
import { useState, useRef, useEffect } from "react";
import QrReader, { UseDataToForm } from "./qrRead";

export default function Form({ setFieldValue, values }) {
  const [open, setOpen] = useState(false);
  const [dataQr, setDataQr] = useState(null);
  const [changeOsQr, setChangeOsQr] = useState(false);
  const {
    data: dataOs,
    add,
    mutate,
  } = useCollection(`pacientes/${values.id}/obrasSociales`, {
    listen: true,
  });
  useEffect(() => {
    if (changeOsQr) {
      const os = findOs(changeOsQr);
      console.log(os);
      if (!os) return;
      setFieldValue("obraSocial", os.id);
      setFieldValue("label_obraSocial", os.obraSocial);
      setChangeOsQr(false);
    }
  }, [changeOsQr]);
  const getField = (dataParsed, field) => {
    const CAMPOS_NOMBRES = ["apellidoNombre", "NombreAfiliado"];
    const CAMPOS_CREDENCIAL = ["credencial", "NumeroAfiliado"];
    const CAMPOS_DNI = ["nro", "documento"];
    const CAMPOS_PLAN = ["plan"];

    switch (field) {
      case "plan":
        // Loop sobre los campos relacionados con la credencial
        for (let key of CAMPOS_PLAN) {
          if (dataParsed[key]) return dataParsed[key];
        }
        break;

      case "nroAfiliado":
        // Loop sobre los campos relacionados con la credencial
        for (let key of CAMPOS_CREDENCIAL) {
          if (dataParsed[key]) return dataParsed[key];
        }
        break;

      case "nombre":
        // Loop sobre los campos relacionados con nombres
        for (let key of CAMPOS_NOMBRES) {
          if (dataParsed[key]) {
            const nombreApellido = dataParsed[key].trim().split(/\s+/);
            return nombreApellido.slice(1).join(" "); // Devuelve el nombre (excluye el primer elemento que es el apellido)
          }
        }
        break;

      case "apellido":
        // Loop sobre los campos relacionados con nombres
        for (let key of CAMPOS_NOMBRES) {
          if (dataParsed[key]) {
            const nombreApellido = dataParsed[key].trim().split(/\s+/);
            return nombreApellido[0]; // Devuelve el apellido (primer elemento)
          }
        }
        break;

      case "dni":
        // Loop sobre los campos relacionados con DNI
        for (let key of CAMPOS_DNI) {
          if (dataParsed[key]) return dataParsed[key];
        }
        break;

      default:
        return null; // Si el campo no es reconocido, devuelve null
    }

    return null; // Si no se encuentra el campo, devuelve null
  };

  const setDataFields = (qrValue) => {
    try {
      const dataParsed = JSON.parse(qrValue.trim());

      const apellido = getField(dataParsed, "apellido");
      const nombre = getField(dataParsed, "nombre");
      const dni = parseInt(getField(dataParsed, "dni", true));
      const nroAfiliado = getField(dataParsed, "nroAfiliado");
      const plan = getField(dataParsed, "plan");
      setDataQr({
        apellido,
        nombre,
        dni,
        nroAfiliado,
        plan,
        tipo: "PACIENTE",
      });
      setOpen(true);
    } catch (e) {
      console.log(e);
    }
  };
  const updateFields = (data) => {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      if (key === "obraSocial") return; //sino me pisa el que ya estaba
      setFieldValue(key, data[key]);
    });
  };
  const findOs = (data) => {
    console.log(`DATA OS`, dataOs);
    for (let os of dataOs) {
      if (os.obraSocial === data.obraSocial) {
        return os;
      }
    }
  };

  const updateOs = (data) => {
    const obraSocial = findOs(data);
    console.log(`actualizando OS!`);
    if (obraSocial) {
      update(`pacientes/${values.id}/obrasSociales/${obraSocial.id}`, {
        ...data,
      });
      setFieldValue("obraSocial", obraSocial.id);
      setFieldValue("label_obraSocial", obraSocial.label_obraSocial);
    } else {
      add(data).then(() => {
        setChangeOsQr(data);
      });
    }
  };
  const onSubmitQr = (data) => {
    updateOs(data);
    updateFields(data);
    setOpen(false);
  };
  return (
    <Grid container spacing={2}>
      <QrReader
        openWindow={open}
        setOpenWindow={setOpen}
        onRead={setDataFields}
      />
      <UseDataToForm
        data={dataQr}
        setFieldValue={setFieldValue}
        open={open}
        setOpen={setOpen}
        onSubmit={onSubmitQr}
      />
      <Grid item md={1}>
        <Switch label="Foto" campo="foto" />
      </Grid>

      {values.foto && (
        <Grid item md={2}>
          <WebcamFormik
            folder={`users/${fuego.auth().currentUser?.uid}/pacientes`}
            label="Foto "
            campo="foto"
          />
        </Grid>
      )}
      <Grid md={values.foto ? 9 : 12} spacing={2} item container>
        <Grid item md={2}>
          <Input focus={true} label="Nombre" campo="nombre" />
        </Grid>
        <Grid item md={2}>
          <Input label="Apellido" campo="apellido" />
        </Grid>
        <Grid item md={3}>
          <SelectFecha
            // callbackChange={cambiaFecha}
            label="Fecha Nacimiento "
            campo={`fechaNacimiento`}
          />
        </Grid>
        <Grid item md={2}>
          <Input label="D.N.I" campo="dni" />
        </Grid>
        <Grid item md={2}>
          <Switch label="Es Particular?" campo="esParticular" />
        </Grid>
        {!values.esParticular && values.exists && (
          <Grid item md={6}>
            <SelectOsPaciente
              idPaciente={values.id ? values.id : ""}
              values={values}
              setFieldValue={setFieldValue}
              campo="obraSocial"
              label="O.S Principal"
            />
          </Grid>
        )}
        {!values.exists && (
          <Grid item md={12}>
            <Typography variant="h6">Obra Social</Typography>
            <FormOs />
          </Grid>
        )}
        <Grid sx={{ pr: 3 }} item md={3}>
          <InputTelefono label="Teléfono" campo="telefono" />
        </Grid>
        {/* <Grid item md={2}>
          <SelectEstaticFormik
            items={["ACTIVO", "INACTIVO"]}
            label="Estado"
            campo="estado"
          />
        </Grid> */}
        <Grid item md={3}>
          <Input label="Email" campo="email" />
        </Grid>

        <Grid item md={4}>
          <Input label="Detalle" campo="detalle" />
        </Grid>
      </Grid>
    </Grid>
  );
}
