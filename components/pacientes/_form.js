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
      if (!os) {
        //ENTONCES ES NUEVO PACIENTE

        // setFieldValue("obraSocial", dataQr.obraSocial);
        // setFieldValue("label_obraSocial", dataQr.label_obraSocial);
        // setChangeOsQr(false);

        return;
      }
      setFieldValue("obraSocial", os.id);
      setFieldValue("label_obraSocial", os.obraSocial);
      setChangeOsQr(false);
    }
  }, [changeOsQr]);
  const checkOsde = (dataParsed) => {
    return (
      dataParsed["plan"].includes("210") ||
      dataParsed["plan"].includes("310") ||
      dataParsed["plan"].includes("450") ||
      dataParsed["plan"].includes("410")
    );
  };
  const getField = (dataParsed, field, isNumber) => {
    const CAMPOS_NOMBRES = ["apellidoNombre", "NombreAfiliado"];
    const CAMPOS_CREDENCIAL = ["credencial", "NumeroAfiliado", "contrato"];
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
            const esOsde = checkOsde(dataParsed);
            const nombreApellido = dataParsed[key].trim().split(/\s+/);
            if (esOsde) return nombreApellido[0];
            return nombreApellido.slice(1).join(" "); // Devuelve el nombre (excluye el primer elemento que es el apellido)
          }
        }
        break;

      case "apellido":
        // Loop sobre los campos relacionados con nombres
        for (let key of CAMPOS_NOMBRES) {
          if (dataParsed[key]) {
            const esOsde = checkOsde(dataParsed);
            const nombreApellido = dataParsed[key].trim().split(/\s+/);
            if (esOsde) return nombreApellido[nombreApellido.length - 1];
            return nombreApellido[0]; // Devuelve el apellido (primer elemento)
          }
        }
        break;

      case "dni":
        // Loop sobre los campos relacionados con DNI
        for (let key of CAMPOS_DNI) {
          if (dataParsed[key])
            return isNumber ? parseInt(dataParsed[key] ?? 0) : dataParsed[key];
        }
        break;

      default:
        return ""; // Si el campo no es reconocido, devuelve null
    }

    return ""; // Si no se encuentra el campo, devuelve null
  };
  function checkGaleno(cadena) {
    if (!cadena.includes("galeno")) return cadena;

    // Primero, decodificamos la cadena completa para manejar caracteres especiales
    const urlDecodificada = decodeURIComponent(cadena);

    // Dividimos la URL por el carácter '-'
    const partes = urlDecodificada.split("-");
    console.log(urlDecodificada, partes);
    // Verificamos que tengamos suficientes partes para procesar
    if (partes.length < 9) {
      console.error("La URL no tiene el formato esperado.");
      return cadena;
    }
    // Obtenemos los datos de interés
    let apellidoNombre = partes[1].replace(",", " "); // Reemplazamos la coma por un espacio
    let credencial = partes[2];
    let colorPlan = partes[3];
    let codigoPlan = partes[4];
    let estado = partes[5];
    if (cadena.includes("Ñ")) {
      apellidoNombre = partes[5].replace(",", " "); // Reemplazamos la coma por un espacio
      credencial = partes[6];
      colorPlan = partes[7];
      codigoPlan = partes[8];
    }

    // Creamos el objeto JSON
    const datos = {
      apellidoNombre,
      credencial,
      colorPlan,
      plan: codigoPlan,
      estado,
      dni: 0, // Por el momento no estamos extrayendo el DNI de la URL
    };

    // Retornamos el objeto como un string JSON
    return JSON.stringify(datos);
  }
  const checkCadena = (cadena) => {
    let aux = checkGaleno(cadena);
    return aux.trim();
  };
  const parseCadenaLector = (cadena) => {
    console.log(`parseCadenaLector`, cadena);
    // Chequeo si la cadena tiene la letra 'ñ'
    if (!cadena.includes("¨")) return cadena;

    // Paso 1: Reemplazar 'ñ' por ':' para formato clave-valor
    cadena = cadena.replace(/ñ/g, ":");
    cadena = cadena.replace(/Ñ/g, ":");
    cadena = cadena.replace("¨", "");
    // Paso 2: Reemplazar '[' por comillas dobles '"'
    cadena = cadena.replace(/\[/g, '"').replace(/\]/g, '"');

    // Paso 3: Reemplazar comillas simples por comillas dobles
    cadena = cadena.replace(/'/g, "");

    // Paso 4: Añadir comas donde corresponde para JSON válido
    cadena = cadena.replace(/", "/g, '", "'); // Aseguramos que los valores estén separados por comas
    cadena = cadena.replace(/":"/g, '": "'); // Aseguramos que después de ':' haya un espacio antes del valor

    // Paso 5: Eliminar el asterisco al final si existe
    cadena = cadena.replace(/\*$/, ""); // Eliminar el último asterisco

    // Paso 6: Añadir llaves para que sea un objeto JSON válido
    cadena = `{${cadena}}`;

    // Verificar si es JSON válido
    try {
      console.log("Cadena JSON:", cadena); // Para ver la cadena resultante
      const jsonObj = JSON.parse(cadena); // Solo para chequear que está bien
      return cadena; // Retorna el objeto JSON
    } catch (error) {
      console.error("Error al parsear JSON:", error);
    }
  };
  const setDataFields = (cadenaLector) => {
    try {
      const qrValue = parseCadenaLector(cadenaLector);
      const cadena = checkCadena(qrValue);
      const dataParsed = JSON.parse(cadena);

      const apellido = getField(dataParsed, "apellido");
      const nombre = getField(dataParsed, "nombre");
      const dni = getField(dataParsed, "dni", true);
      const nroAfiliado = getField(dataParsed, "nroAfiliado");
      const plan = getField(dataParsed, "plan");
      const data = {
        apellido,
        nombre,
        dni,
        nroAfiliado,
        plan,
        tipo: "PACIENTE",
      };
      console.log(data);
      setDataQr(data);
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
    if (!values.id) {
      console.log(`aun no esta cargado el paciente`);
      setFieldValue("obraSocial", data.obraSocial);
      setFieldValue("label_obraSocial", data.label_obraSocial);
      return;
    }
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
