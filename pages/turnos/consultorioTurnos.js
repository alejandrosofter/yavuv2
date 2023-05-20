import React, { useState, useEffect } from "react";
import NuevoTurno from "./nuevo";
import EditarTurno from "./editar";
import { porcentajeColor } from "@helpers/colores";
import { Button, Grid, Icon, Stack, Typography } from "@mui/material";
import { formatPorcentual } from "@helpers/numbers";

import DialogContenido from "@components/forms/dialogContenido";
import ListaSimple from "@components/forms/listaSimple";
import { getFechaString } from "@helpers/dates";
import { getHorariosDia } from "@helpers/horarios";

import ItemTurno from "./itemTurno";
import AbrirAgendaMes from "./abrirAgendaMes";
import moment from "moment";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { UseConfigModulo } from "@helpers/useConfigModulo";
const ConsultorioTurnos = ({
  fechaBusca,
  callbackchange,
  consultorio,
  muestra,
}) => {
  useEffect(() => {
    // .format("YYYY-MM-DD")}`);
    setHorariosDisponibles();
  }, [fechaBusca]);
  const config = UseConfigModulo("turnos");
  const [seleccion, setSeleccion] = useState(null);
  const [dataImpresion, setDataImpresion] = useState();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: config?.impresionTurno,
    data: dataImpresion,
  });

  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataHorarios, setDataHorarios] = useState();

  const [horarios, setHorarios] = useState([]);
  const [openNuevoTurno, setOpenNuevoTurno] = useState(false);
  const [openUpdateTurno, setOpenUpdateTurno] = useState(false);
  const [preData, setPredata] = useState();
  //esta funcion recibe una fecha y devuelve 2 fechas que son desde que comienza el dia hasta que termina

  const handleNuevoTurno = (data) => {
    setOpenNuevoTurno(false);
    setOpenUpdateTurno(false);
    setHorariosDisponibles();
    setDataImpresion({ ...data });
    setOpenImpresion(true);
  };

  const handleChange = (item) => {
    if (item.estado === "OCUPADO") {
      setPredata(item.turnoOcupado);
      setOpenUpdateTurno(true);
    } else {
      const aux = {
        fechaTurno: moment(item.value.seconds * 1000).toDate(),
        consultorio: consultorio.id,
        nombreConsultorio: consultorio.nombre,
        direccionConsultorio: consultorio.direccion,
        telefonoConsultorio: consultorio.telefono,
      };
      setPredata(aux);
      setOpenNuevoTurno(true);
    }

    if (callbackchange) callbackchange(item);
  };
  const setHorariosDisponibles = async () => {
    if (consultorio) {
      const data = await getHorariosDia({ fechaBusca, consultorio });

      if (data.length > 0) setDataHorarios(data[0]);
      else setDataHorarios(null);
    }
  };
  const abrioAgenda = () => {
    setHorariosDisponibles();
  };
  const estilo = {
    bgcolor: porcentajeColor(dataHorarios?.porcentual, true),
    m: 1,
    border: 1,
    padding: 2,
    borderRadius: 1,
    borderColor: "#c9c9c6de",
    display: !muestra ? "none" : "si",
    boxShadow: 2,
    // width: "5rem",
    // height: "5rem",
  };

  if (!dataHorarios)
    return (
      <AbrirAgendaMes
        consultorio={consultorio}
        estilo={estilo}
        data={dataHorarios}
        fechaBusca={fechaBusca}
        callbackSuccess={abrioAgenda}
      />
    );

  return (
    <Grid
      sx={{
        ...estilo,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Typography variant="h6">{consultorio.nombreCorto}</Typography>

        <Typography variant="overline">{`${dataHorarios.cantidadOcupados}/${dataHorarios.cantidadDisponibles}`}</Typography>
        <Button onClick={() => setHorariosDisponibles()}>
          <Icon className="fas fa-repeat" />
        </Button>
      </Stack>
      <ListaSimple
        onClick={handleChange}
        items={dataHorarios.horariosDisponibles}
        campoId="value"
        fnRender={(item) => <ItemTurno item={item} consultorio={consultorio} />}
      />
      <DialogContenido
        fullWidth={true}
        maxWidth="md"
        open={openNuevoTurno}
        setOpen={setOpenNuevoTurno}
        titulo="Nuevo Turno"
      >
        <NuevoTurno
          titulo={getFechaString(preData?.fechaTurno, "DD/MM HH:mm")}
          subTitulo={`en ${consultorio.nombre}`}
          preData={preData}
          callbackSuccess={handleNuevoTurno}
        />
      </DialogContenido>
      <DialogContenido
        fullWidth={true}
        maxWidth="md"
        open={openUpdateTurno}
        setOpen={setOpenUpdateTurno}
        titulo="Editar Turno"
      >
        <EditarTurno idItem={preData?.id} callbackSuccess={handleNuevoTurno} />
      </DialogContenido>
      <ImpresionDialog
        titulo="IMPRESIÓN TURNO"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="TURNO "
        plantillaEmail={config?.plantillaTurno}
        data={dataImpresion}
        plantilla={plantilla}
      />
    </Grid>
  );
};

export default ConsultorioTurnos;
