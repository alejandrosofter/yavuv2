import { Icon, Tooltip } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress, Stack } from "@mui/material";
import DialogContenido from "@components/forms/dialogContenido";
import parse from "html-react-parser";
import { postData } from "@helpers/Fetcher";
export default function EventosBootWeb({ setFieldValue, boots, data, set }) {
  const [loading, setLoading] = useState(false);
  const [dataParse, setDataParse] = useState();
  const [resultados, setResultados] = useState();

  const [openError, setOpenError] = useState();
  const [openResultados, setOpenResultados] = useState();
  const [textoRespuesta, setTextoRespuesta] = useState("");
  useEffect(() => {
    if (boots) boots.forEach((boot) => checkEventos(boot, "onChange"));
  }, [data]);

  useEffect(() => {
    // await consulta()
    if (boots) boots.forEach((boot) => checkEventos(boot, "onCreate"));
  }, [boots]);

  if (!boots) return "No boots";

  const getValorParametro = (data, valorParametro) => {
    let valor = data;
    let arr = valorParametro.split(".");
    arr.forEach((item) => {
      valor = valor ? valor[item] : null;
    });
    return valor;
  };
  const parseDataBootWeb = (boot, data) => {
    let datosParse = {};
    boot.parametros.split("\n").forEach((parametro) => {
      const [key, valor] = parametro.split("=");
      datosParse[key] = getValorParametro(data, valor);
    });
    return datosParse;
  };
  const dataOk = (data) => {
    for (let variable in data) {
      if (!data[variable]) return false;
    }
    return true;
  };
  const textoRta = (data, layout) => {
    return eval("`" + layout + "`");
  };

  const callBoot = async (boot) => {
    const dataParse = { ...parseDataBootWeb(boot, data), id: boot.bootWeb };
    if (dataOk(dataParse) && !loading) {
      setLoading(true);
      setDataParse(dataParse);

      axios
        .post(`/api/bootsWeb/${dataParse.id}`, dataParse)
        .then((res) => {
          setTextoRespuesta(textoRta(res.data.result, boot.salida));
          setResultados(res.data);
          setOpenResultados(true);
          setLoading(false);
        })
        .catch((err) => {
          setOpenError(true);
          setTextoRespuesta(JSON.stringify(err));
          setLoading(false);
        });
    }
  };
  const onChange = async (boot) => {
    callBoot(boot);
  };
  const onCreate = async (boot) => {
    setFieldValue("onCreate", { ...boot, estado: "PENDIENTE" });
  };

  const checkEventos = (boot, tipoEvento) => {
    const auxBoot = { ...boot, eventos: boot.eventos.split("\n") };

    const eventos = auxBoot.eventos ? auxBoot.eventos : [];

    for (let i in eventos) {
      if (eventos[i]) {
        const evento = eventos[i];
        const variableString = evento.split("(")[1].split(")")[0];
        const eventoString = evento.split("(")[0];
        const fnString = `${eventoString}(auxBoot)`;

        if (eventoString === tipoEvento) {
          try {
            eval(fnString);
          } catch (err) {}
        }
      }
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Icon className="fas fa-globe-americas" />
      {loading && (
        <Tooltip title="Realizando consulta WEB ">
          <CircularProgress />
        </Tooltip>
      )}
      <DialogContenido titulo="Opss..." open={openError} setOpen={setOpenError}>
        {textoRespuesta}
      </DialogContenido>
      <DialogContenido
        titulo="RESULTADOS CONSULTA WEB"
        open={openResultados}
        setOpen={setOpenResultados}
      >
        {parse(textoRespuesta)}
      </DialogContenido>
    </Stack>
  );
}
