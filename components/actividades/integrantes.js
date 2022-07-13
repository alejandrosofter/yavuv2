import ListaSimple from "@components/forms/listaSimple";
import { useDataModulo } from "@hooks/useDataModulo";
import { UseSeleccion } from "@hooks/useSeleccion";
import { Grid } from "@mui/material";

import { DetalleActividad } from "./detalleActividad";
import { DetalleSubActividad } from "./detalleSubActividad";
export default function Modulo({ mod }) {
  const [actividadSeleccion, setActividadSeleccion] = UseSeleccion("actividad");
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

  return (
    <Grid container>
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
    </Grid>
  );
}
