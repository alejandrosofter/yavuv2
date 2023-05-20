import ABMColeccion from "@components/forms/ABMcollection";
import Modelo, { valoresIniciales } from "@modelos/ModeloDispositivo";
import Form from "@components/dispositivos/_form";
import { getWherePermiso } from "@hooks/useUser";
export default function Modulo({ mod }) {
  const order = "nombre";
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 190,
    },
    {
      field: "label_tipoEquipo",
      headerName: "Tipo Equipo",
      width: 160,
    },
    {
      field: "identificador",
      headerName: "ID",
      width: 120,
    },
    {
      field: "estado",
      headerName: "ESTADO",
      width: 120,
    },
  ];
  return (
    <ABMColeccion
      coleccion={`dispositivos`}
      columns={columns}
      acciones={[]}
      orderBy={order}
      maxWidth="lg"
      where={getWherePermiso("dispositivos")}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      titulo={`DISPOSITIVOS/`}
      Form={Form}
    />
  );
}
