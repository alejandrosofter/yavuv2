import { groupBy } from "../../helpers/arrays";
import TitulosFormularios from "@components/forms/tituloFormularios";

import { PieChart } from "../trading/estadistica/pieChart2";
export default function Modulo({
  data,
  titulo,
  subtitulo,
  tipo,
  series,
  labels,
}) {
  const categorias = [
    { label: "ENE", valor: 1 },
    { label: "FEB", valor: 2 },
    { label: "MAR", valor: 3 },
    { label: "ABR", valor: 4 },
    { label: "MAY", valor: 5 },
    { label: "JUN", valor: 6 },
    { label: "JUL", valor: 7 },
    { label: "AGO", valor: 8 },
    { label: "SEP", valor: 9 },
    { label: "OCT", valor: 10 },
    { label: "NOV", valor: 11 },
    { label: "DIC", valor: 12 },
  ];
  //   const {data}=useCollection(coleccion)

  if (!data) return "cargando";
  const agrupado = groupBy(
    data,
    (dato) => "fecha" in dato && new Date(dato.fecha).getMonth()
  );

  return (
    <div style={{ width: "100%" }}>
      <TitulosFormularios
        titulo={titulo}
        subTitulo={subtitulo}
        icono="fas fa-chart-area"
      />
      <PieChart
        labels={labels}
        series={series}
        tipo={tipo}
        datos={agrupado}
        campoSum="importe"
        categorias={categorias}
      />
    </div>
  );
}
