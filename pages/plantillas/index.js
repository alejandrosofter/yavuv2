import ABMColeccion from "@components/forms/ABMcollection";
import Modelo, { valoresIniciales } from "@modelos/ModeloPlantillas";
import { fuego } from "@nandorojo/swr-firestore";
import Form from "./_form";
import { getWherePermiso } from "@hooks/useUser";
export default function Modulo({ mod }) {
  const order = ["nombre", "desc"];
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 190,
    },
    {
      field: "identificador",
      headerName: "ID",
      width: 120,
    },
  ];
  const parentData = true;
  return (
    <ABMColeccion
      coleccion={`plantillas`}
      columns={columns}
      where={getWherePermiso("plantillas")}
      labelNuevo="nueva"
      preData={{}}
      order={order}
      maxWidth={"lg"}
      // callbackclick={callbackclick}
      icono={"fas fa-"}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      dataForm={{}}
      titulo={`PLANTILLAS`}
      Form={Form}
    />
  );
}
