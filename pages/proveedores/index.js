import Modelo, { valoresIniciales } from "@modelos/ModeloProveedores";
import Form from "@components/proveedores/_form";
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
