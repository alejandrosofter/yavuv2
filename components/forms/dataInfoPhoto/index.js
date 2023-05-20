import { Button, Icon, Stack } from "@mui/material";
import { useState } from "react";
import { getIndexArray, getIndexItemArray } from "../../../helpers/arrays";
import DialogContenido from "../dialogContenido";
import ImageUpload from "../imageUpload";
import SelectSimple from "../selectSimple";
import Tabla from "../tabla";
import moment from "moment";
import { getFechaString } from "@helpers/dates";
export default function Modulo({ fnCambia }) {
  const [dataGoogle, setDataGoogle] = useState([]);
  const [openResultados, setOpenResultados] = useState(false);
  const [dataResultados, setDataResultados] = useState([]);
  const folder = `socios/afiliaciones/`;
  const data_dorsoDni = [
    {
      labelPrev: ["DOMICILIO:", "DOMICILIO"],
      labelField: "Domicilio",
      posicionesPosFind: 7,
      field: "domicilio",
    },
    {
      labelPrev: ["CUIL:", "CUIL"],
      labelField: "CUIL",
      posicionesPosFind: 1,
      field: "cuil",
    },
  ];
  const getMes = (valor) => {
    const meses = [
      "ENE",
      "FEB",
      "MAR",
      "MAY",
      "JUN",
      "JUL",
      "AGO",
      "SEP",
      "OCT",
      "NOV",
      "DIC",
    ];
    for (let i = 0; i < meses.length; i++)
      if (valor.indexOf(meses[i]) > 0) return i + 1;
    return 0;
  };
  const data_frenteDni = [
    {
      labelPrev: "Name",
      posicionesPosFind: 2,
      field: "nombre",
      labelField: "Nombre",
    },
    {
      labelPrev: ["Surname", "Surneme"],
      posicionesPosFind: 1,
      field: "apellido",
      labelField: "Apellido",
    },
    {
      labelPrev: "Sex",
      posicionesPosFind: 1,
      labelField: "Sexo",
      field: "sexo",
      fn: (valor) => (valor == "M" ? "MASCULINO" : "FEMENINO"),
    },
    {
      labelPrev: "birth",
      posicionesPosFind: 4,
      labelField: "Fecha Nac.",
      field: "fechaNacimiento",
      fn: (valor) => {
        const mes = getMes(valor);
        const arrWords = valor.split(" ");

        const ano = arrWords[3];
        const dia = arrWords[0];
        return new Date(`${ano}/${mes}/${dia}`);
      },
    },
    {
      labelPrev: "Document",
      posicionesPosFind: 1,
      labelField: "D.N.I",
      field: "dni",
      fn: (valor) => valor.replaceAll(".", ""),
    },
  ];
  const getValorBuscado = (array, posEncontro, cantidad, campo, fn) => {
    let salida = "";
    const desde = posEncontro + 1;
    const hasta = desde + cantidad;
    for (let i = desde; i < hasta; i++) salida += `${array[i][campo]} `;
    salida = salida.trim();
    if (fn) return fn(salida);
    return salida;
  };
  const getData = (arrGoogle, arrDataBusco) => {
    const campoValor = "description";
    if (arrGoogle.length == 0) return [];
    const arrData = arrGoogle[0]["textAnnotations"];

    const res = arrDataBusco.map((item) => {
      const i = getIndexItemArray({
        data: arrData,
        valor: item.labelPrev,
        campoId: campoValor,
      });

      if (i > 0)
        return {
          value: getValorBuscado(
            arrData,
            i,
            item.posicionesPosFind,
            campoValor,
            item?.fn
          ),
          campo: item.field,
          labelCampo: item.labelField,
        };
      return "";
    });
    return res;
  };
  const doneUpload = async (path, pathThum, snap) => {
    const url = `/api/socios/validaciones?path=${path}`;

    const arrGoogleVision = await (await fetch(url)).json();
    setDataGoogle(arrGoogleVision);
    setOpenResultados(true);
  };
  const cambiaSelect = (valor) => {
    const data = eval(`data_${valor}`);
    const resultados = getData(dataGoogle, data);
    setDataResultados(resultados);
  };
  const clickAceptar = () => {
    if (fnCambia) fnCambia(dataResultados);
  };
  const colsTabla = [
    {
      field: "value",
      label: "Valor",
      fn: (valor) => {
        if (moment.isDate(valor)) return getFechaString(valor);
        return valor;
      },
    },
    { label: "Campo", field: "labelCampo" },
  ];
  const listaSelect = [
    { label: "Frente DNI", value: "frenteDni", id: "1" },
    { id: "2", label: "Dorso DNI", value: "dorsoDni" },
  ];
  return (
    <Stack sx={{}}>
      <ImageUpload
        folder={folder}
        callbackchange={doneUpload}
        icon={<Icon className="fas fa-barcode" />}
      />
      <DialogContenido
        titulo="RESULTADOS SCAN"
        open={openResultados}
        setOpen={setOpenResultados}
      >
        <SelectSimple label="Forma" lista={listaSelect} fn={cambiaSelect} />
        <Tabla cols={colsTabla} data={dataResultados} />
        <Button onClick={clickAceptar}>
          <Icon className="fas fa-tick" />
          ACEPTAR
        </Button>
      </DialogContenido>
    </Stack>
  );
}
