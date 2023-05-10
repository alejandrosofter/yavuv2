import ImpresionDialog from "@components/forms/impresion";
import ListaSimple from "@components/forms/listaSimple";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { useDataModulo } from "@hooks/useDataModulo";
import { UseSeleccion } from "@hooks/useSeleccion";
import { Grid, Button, Icon } from "@mui/material";

import { DetalleActividad } from "./detalleActividad";
import { DetalleSubActividad } from "./detalleSubActividad";
export default function Modulo({ mod }) {
  const [actividadSeleccion, setActividadSeleccion] = UseSeleccion("actividad");
  const idPlantilla = mod.config?.plantillaAsistencias;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();

  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const [subActividadSeleccion, setSubActividadSeleccion] =
    UseSeleccion("subActividad");

  const columns = [
    {
      field: "nombreActividad",
      headerName: "Actividad",
      width: 150,
    },
    {
      field: "label_estado",
      headerName: "Estado",
      width: 100,
    },
  ];
  const clickItem = (item, padre) => {
    setActividadSeleccion(padre);
    setSubActividadSeleccion(item);
  };
  const { data, error } = useDataModulo({
    mod,
    coleccion: mod.coleccion,
    orderBy: ["nombreActividad"],
  });
  const imprimirIntegrantes = () => {};
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button onClick={imprimirIntegrantes}>
          <Icon className="fas fa-print" />
        </Button>
      </Grid>
      <Grid item xs={2}>
        <ListaSimple
          items={data}
          campoId="id"
          campoLabelSubCampo={(subItem) =>
            `${subItem.nombreActividad} (${
              subItem.cantidadIntegrantes ? subItem.cantidadIntegrantes : 0
            })`
          }
          subCampo="subActividades"
          fnRender={(value) =>
            `${value.nombreActividad} (${
              value.cantidadIntegrantes ? value.cantidadIntegrantes : 0
            })`
          }
          onClickSubItem={clickItem}
        />
      </Grid>
      <Grid item xs={10}>
        <DetalleActividad item={actividadSeleccion} />
        <DetalleSubActividad item={subActividadSeleccion} />
      </Grid>
      <ImpresionDialog
        titulo="IMPRESIÓN ASISTENCIAS"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="ASISTENCIAS "
        data={dataImpresion}
        plantilla={plantilla}
        emailDefault={dataImpresion?.socio?.email}
        nombrePlantillaEmail="emailAfiliacion"
        attachments={[{ filename: "AFILIACION.pdf", data: plantilla }]}
      />
    </Grid>
  );
}
