import Grid from "@mui/material/Grid";

import useSWR from "swr";
import dynamic from "next/dynamic";

export default function ModuloABM({ token, modulo, pathItem }) {
  const url = `/api/moduloABM?coleccion=${modulo.coleccion}`;
  const { data: dataIndex, mutate, error } = useSWR(url);
  if (error)
    return (
      <div>
        Error con el logueo del token, puedes desloguear y volver a intenarlo
      </div>
    );
  if (!dataIndex) return "Cargando data..";
  const ComponenteItem = dynamic(() => import(`../../${pathItem}`), {
    loading: ({ error, timedOut, isLoading }) => {
      if (isLoading) return "cargando...";
      if (error)
        return <span>{`Error al cargal el componente (${error})`}</span>;
      if (timedOut) return <span>Tiempo de espera agotado</span>;
    },
  });
  return (
    <Grid spacing={3} rowSpacing={2} container>
      {dataIndex &&
        dataIndex.map((data) => {
          return (
            <Grid key={`grid_${data.id}`} item>
              <ComponenteItem
                token={token}
                modulo={modulo}
                mutate={mutate}
                data={data}
              />
            </Grid>
          );
        })}
    </Grid>
  );
}
