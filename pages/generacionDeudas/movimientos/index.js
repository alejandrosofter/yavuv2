import ABMColeccion2 from "@components/forms/ABMcollection2";
import { getFechaString } from "@helpers/dates";
import { fuego } from "@nandorojo/swr-firestore";
import { useRef } from "react";
import Form from "./_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloPredeudaSocios";
import DrawerPersonalizado from "@components/forms/drawerPerosnalizado";
export default function MovimientosGeneracionDeuda({
  parentData,
  grupo,
  actividad,
  tipoOperacion,
  openDrawer,
  setOpenDrawer,
}) {
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
      accessorKey: "tipoOperacion",
      header: "Tipo",
      size: 120,
      Cell: ({ cell }) =>
        `${cell.row.original?.tipoOperacion}(${
          Object.keys(cell.row.original?.items).length
        })`,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 150,
    },
  ];
  return (
    <DrawerPersonalizado
      anchor={"right"}
      open={openDrawer}
      width={450}
      zIndex={1300}
      setOpen={setOpenDrawer}
    >
      <ABMColeccion2
        coleccion={`generacionDeuda_movimientos`}
        columns={columns}
        hideNew={true}
        acciones={acciones}
        maxWidth={"md"}
        where={[
          parentData
            ? ["idUsuario", "==", localStorage.getItem("usermod")]
            : ["usermod", "==", fuego.auth().currentUser?.uid],
          // ["tipoOperacion", "==", tipoOperacion],
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
    </DrawerPersonalizado>
  );
}
