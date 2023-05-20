import ABMColeccion from "@components/forms/ABMcollection";
import Modelo, { valoresIniciales } from "@modelos/ModeloProveedores";
import Form from "./_form";
import { fuego } from "@nandorojo/swr-firestore";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import { getWherePermiso } from "@hooks/useUser";

export default function Modulo({ parentData }) {
  const order = "razonSocial";

  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-business-time",
    //   label: "Movimientos",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenMovimientos(true);
    //   },
    // },
  ];
  const columns = [
    {
      accessorKey: "razonSocial",
      header: "Razon social",
      size: 150,
    },
  ];
  const fnAcciones = [];

  return (
    <ABMColeccion2
      coleccion={`proveedores`}
      columns={columns}
      acciones={fnAcciones}
      maxWidth={"lg"}
      where={getWherePermiso("proveedores")}
      orderBy={order}
      icono={"fas fa-users"}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      titulo={`PROVEEDORES`}
      Form={Form}
    />
  );
}
//getserverSideProps
