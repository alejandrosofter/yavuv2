import ABMColeccion2 from "@components/forms/ABMcollection2";
import { getFechaString } from "@helpers/dates";
import { fuego } from "@nandorojo/swr-firestore";
import { useRef } from "react";
import Form from "./_formMovimiento";
import {
  ModeloItemMovimiento as Modelo,
  valoresInicialesMovimiento as valoresIniciales,
} from "@modelos/ModeloPredeudaSocios";
export default function MovimientosPredeuda({ parentData, tipoOperacion }) {
  const order = ["fecha_timestamp", "desc"];
  const tableInstanceRef = useRef();
  const acciones = [];
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 100,
      Cell: ({ cell }) => getFechaString(cell.row.original?.fecha),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 200,
    },
  ];
  return (
    <ABMColeccion2
      coleccion={`socios_predeudas_movimientos`}
      columns={columns}
      hideNew={true}
      acciones={acciones}
      maxWidth={"md"}
      where={[
        parentData
          ? ["idUsuario", "==", localStorage.getItem("usermod")]
          : ["usermod", "==", fuego.auth().currentUser?.uid],
        ["tipoOperacion", "==", tipoOperacion],
      ]}
      gridOptions={{
        tableInstanceRef,
        initialState: { showColumnFilters: false },
        enableRowSelection: false,
        filterFns: {
          filtroFecha: (row, id, filterValue) => {
            const date = new Date(row.original[id].seconds * 1000);
            const dateFiltro = new Date(filterValue);

            //si es fecha invalida
            if (isNaN(dateFiltro.getTime())) return true;
            //comparo fechas
            return (
              date.getDate() === dateFiltro.getDate() &&
              date.getMonth() === dateFiltro.getMonth() &&
              date.getFullYear() === dateFiltro.getFullYear()
            );
          },
        },
        // getRowId: (row) => row.id,
      }}
      order={order}
      // callbackclick={callbackclick}
      icono={"fas fa-users"}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      // dataForm={{ grupo: seleccion }}
      titulo={`Movimientos`}
      Form={Form}
    />
  );
}
